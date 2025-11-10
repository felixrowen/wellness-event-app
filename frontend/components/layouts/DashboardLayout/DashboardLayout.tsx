import { ReactNode, useState } from "react";
import { Button } from "@heroui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/router";

import { SIDEBAR_HR, SIDEBAR_VENDOR } from "./DashboardLayout.constants";

import { Sidebar, SidebarSection } from "@/components/ui/Sidebar";
import { Logo } from "@/components/icons";
import { Navbar } from "@/components/ui/Navbar";
import { PageHead } from "@/components/layouts/head";

export interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  type?: "hr" | "vendor";
  sidebarSections?: SidebarSection[];
}

const DashboardLayout = ({
  children,
  title = "Dashboard",
  description,
  type = "vendor",
  sidebarSections,
}: DashboardLayoutProps) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    router.push("/auth/login");
  };

  const sections =
    sidebarSections ||
    (type === "hr" ? SIDEBAR_HR(handleLogout) : SIDEBAR_VENDOR(handleLogout));

  const sidebarHeader = (
    <div className="flex items-center gap-3">
      <Logo size={32} />
      {!collapsed && (
        <div className="flex flex-col">
          <span className="font-bold text-lg">Wellness Events</span>
          <span className="text-xs text-default-500">
            {type === "hr" ? "HR Portal" : "Vendor Portal"}
          </span>
        </div>
      )}
    </div>
  );

  const sidebarFooter = null;

  const navbarConfig = {
    hr: {
      title: "HR Admin Dashboard",
      userName: "HR Admin",
      userEmail: "hr@techcorp.com",
      userAvatar: "https://i.pravatar.cc/150?u=hradmin",
    },
    vendor: {
      title: "Vendor Dashboard",
      userName: "Vendor User",
      userEmail: "vendor@wellness.app",
      userAvatar: "https://i.pravatar.cc/150?u=vendor",
    },
  };

  const config = navbarConfig[type];

  return (
    <>
      <PageHead title={title} />
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
            title={title}
            userAvatar={config.userAvatar}
            userEmail={config.userEmail}
            userName={config.userName}
            onLogout={handleLogout}
            onMenuClick={() => setCollapsed(!collapsed)}
          />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {description && (
                <p className="mb-4 text-small text-default-500">
                  {description}
                </p>
              )}
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
