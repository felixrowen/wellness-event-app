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
        credentials: Record<"identifier" | "password", string> | undefined,
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

          const profileResult = await authServices.getProfileWithToken(token);
          const user = profileResult.data.data;

          if (profileResult.status === 200 && user._id) {
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
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;

      return session;
    },
  },
});
