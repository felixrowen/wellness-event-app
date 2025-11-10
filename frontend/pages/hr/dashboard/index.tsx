import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import HRDashboard from "@/components/views/HRDashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function HRDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");

    if (!isAuthenticated) {
      router.push("/auth/login");

      return;
    }

    if (userRole === "VENDOR") {
      router.push("/dashboard");

      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <DashboardLayout title="HR Admin Dashboard" type="hr">
      <HRDashboard />
    </DashboardLayout>
  );
}
