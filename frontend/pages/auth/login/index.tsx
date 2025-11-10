import { useEffect } from "react";
import { useRouter } from "next/router";

import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Login";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");

    if (isAuthenticated) {
      if (userRole === "HR") {
        router.replace("/hr/dashboard");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [router]);

  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}
