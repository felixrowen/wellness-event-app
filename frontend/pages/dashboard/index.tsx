import { Button } from "@heroui/button";
import { useRouter } from "next/router";

import DefaultLayout from "@/components/layouts/default";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/auth/login");
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Welcome! You are authenticated.</p>
        <Button color="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </DefaultLayout>
  );
}
