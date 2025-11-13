import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import environment from "@/config/environment";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined
      ): Promise<UserExtended | null> {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        try {
          const loginResult = await authServices.login({
            email: identifier,
            password,
          });

          const token = loginResult.data.data.token;

          if (!token || loginResult.status !== 200) {
            return null;
          }

          const profileResult = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          );

          if (!profileResult.ok) {
            return null;
          }

          const profileData = await profileResult.json();
          const user = profileData.data;

          if (user._id) {
            return {
              ...user,
              id: user._id,
              accessToken: token,
            };
          }

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as UserExtended;
      }

      return token as JWTExtended;
    },
    async session({ session, token }) {
      const extendedSession = session as SessionExtended;
      const extendedToken = token as JWTExtended;

      extendedSession.user = extendedToken.user;
      extendedSession.accessToken = extendedToken.user?.accessToken;

      return extendedSession;
    },
  },
});
