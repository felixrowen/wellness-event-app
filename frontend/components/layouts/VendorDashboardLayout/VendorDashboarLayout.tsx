import { ReactNode, useState } from "react";
import { Button } from "@heroui/react";
import { FiHome, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/router";

import { Sidebar, SidebarSection } from "@/components/ui/Sidebar";
import { Logo } from "@/components/icons";
import { Navbar } from "@/components/ui/Navbar";

export interface VendorDashboardLayoutProps {
  children: ReactNode;
}

export const VendorDashboardLayout = ({
  children,
}: VendorDashboardLayoutProps) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    router.push("/auth/login");
  };

  const sections: SidebarSection[] = [
    {
      // title: "Main",
      items: [
        {
          key: "dashboard",
          label: "Dashboard",
          href: "/dashboard",
          icon: <FiHome size={20} />,
        },
        {
          key: "logout",
          label: "Logout",
          icon: <FiLogOut size={20} />,
          onClick: handleLogout,
        },
      ],
    },
  ];

  const sidebarHeader = (
    <div className="flex items-center gap-3">
      <Logo size={32} />
      {!collapsed && (
        <div className="flex flex-col">
          <span className="font-bold text-lg">Wellness Events</span>
          <span className="text-xs text-default-500">Vendor Portal</span>
        </div>
      )}
    </div>
  );

  const sidebarFooter = null;

  return (
    <div className="flex h-screen overflow-hidden bg-default-50">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          onPress={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </Button>
      </div>

      {mobileOpen && (
        <button
          aria-label="Close menu"
          className="lg:hidden fixed inset-0 bg-black/50 z-40 cursor-default"
          tabIndex={-1}
          type="button"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMobileOpen(false);
          }}
        />
      )}

      <div className="hidden lg:block">
        <Sidebar
          collapsed={collapsed}
          footer={sidebarFooter}
          header={sidebarHeader}
          sections={sections}
        />
      </div>

      <div
        className={`lg:hidden fixed left-0 top-0 h-full z-40 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          footer={sidebarFooter}
          header={sidebarHeader}
          sections={sections}
          onItemClick={() => setMobileOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          showMenuButton
          title="Vendor Dashboard"
          userAvatar="https://i.pravatar.cc/150?u=vendor"
          userEmail="vendor@wellness.app"
          userName="Vendor User"
          onLogout={handleLogout}
          onMenuClick={() => setCollapsed(!collapsed)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
