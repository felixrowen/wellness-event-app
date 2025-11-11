import { useState } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { FiHome, FiLogOut, FiCalendar } from "react-icons/fi";

import { SidebarSection } from "@/components/ui/Sidebar";
import { Logo } from "@/components/icons";
import { SessionExtended } from "@/types/Auth";

interface UseDashboardLayoutProps {
  type: "hr" | "vendor";
  sidebarSections?: SidebarSection[];
}

export function useDashboardLayout({
  type,
  sidebarSections,
}: UseDashboardLayoutProps) {
  const router = useRouter();
  const { data: session } = useSession() as { data: SessionExtended | null };
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };

  const SIDEBAR_HR = (handleLogout: () => void): SidebarSection[] => [
    {
      title: "Main",
      items: [
        {
          key: "dashboard",
          label: "Manage Events",
          href: "/hr/dashboard",
          icon: <FiHome size={20} />,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          key: "logout",
          label: "Logout",
          icon: <FiLogOut size={20} />,
          onClick: handleLogout,
        },
      ],
    },
  ];

  const SIDEBAR_VENDOR = (handleLogout: () => void): SidebarSection[] => [
    {
      title: "Main",
      items: [
        {
          key: "dashboard",
          label: "My Events",
          href: "/dashboard",
          icon: <FiCalendar size={20} />,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          key: "logout",
          label: "Logout",
          icon: <FiLogOut size={20} />,
          onClick: handleLogout,
        },
      ],
    },
  ];

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
      userName: session?.user?.fullName,
      userEmail: session?.user?.email,
      userAvatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Leah",
    },
    vendor: {
      title: "Vendor Dashboard",
      userName: session?.user?.fullName,
      userEmail: session?.user?.email,
      userAvatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Jade",
    },
  };

  const config = navbarConfig[type];

  return {
    collapsed,
    setCollapsed,
    mobileOpen,
    setMobileOpen,
    handleLogout,
    sections,
    sidebarHeader,
    sidebarFooter,
    config,
  };
}
