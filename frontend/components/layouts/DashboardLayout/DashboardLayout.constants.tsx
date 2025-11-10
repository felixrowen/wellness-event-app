import { FiHome, FiLogOut, FiCalendar } from "react-icons/fi";

import { SidebarSection } from "@/components/ui/Sidebar";

export const SIDEBAR_HR = (handleLogout: () => void): SidebarSection[] => [
  {
    title: "Main",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        href: "/hr/dashboard",
        icon: <FiHome size={20} />,
      },
      {
        key: "events",
        label: "Events",
        href: "/hr/events",
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

export const SIDEBAR_VENDOR = (handleLogout: () => void): SidebarSection[] => [
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
