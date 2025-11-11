import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function IndexPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/auth/login");
    } else if (session?.user) {
      const userRole = (session.user as any).role;

      if (userRole === "HR") {
        router.replace("/hr/dashboard");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [router, session, status]);

  return null;
}
