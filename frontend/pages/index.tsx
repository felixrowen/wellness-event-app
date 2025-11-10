import { useEffect } from "react";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");

    if (!isAuthenticated) {
      router.replace("/auth/login");
    } else if (userRole === "HR") {
      router.replace("/hr/dashboard");
    } else {
      router.replace("/dashboard");
    }
  }, [router]);

  return null;
}
