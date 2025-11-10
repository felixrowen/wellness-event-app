import { useEffect } from "react";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      router.replace("/auth/login");
    } else {
      router.replace("/dashboard");
    }
  }, [router]);

  return null;
}
