import DashboardLayout from "@/components/layouts/DashboardLayout";
import VendorDashboard from "@/components/views/VendorDashboard";

const DashboardPage = () => {
  return (
    <DashboardLayout title="Vendor Dashboard">
      <VendorDashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;
