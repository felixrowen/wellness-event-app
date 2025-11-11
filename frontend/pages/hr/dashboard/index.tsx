import HRDashboard from "@/components/views/HRDashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function HRDashboardPage() {
  return (
    <DashboardLayout title="HR Admin Dashboard" type="hr">
      <HRDashboard />
    </DashboardLayout>
  );
}
