import { useEffect } from "react";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated (using placeholder flag)
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      router.replace("/auth/login");
    } else {
      // If authenticated, redirect to dashboard or main page
      router.replace("/dashboard");
    }
  }, [router]);

  return null;
}
