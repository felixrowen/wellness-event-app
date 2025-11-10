import { FC } from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { FiMenu, FiLogOut } from "react-icons/fi";

export interface NavbarProps {
  title?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export const Navbar: FC<NavbarProps> = ({
  title = "Dashboard",
  onMenuClick,
  showMenuButton = true,
  userName = "Vendor User",
  userEmail = "vendor@wellness.app",
  userAvatar = "https://i.pravatar.cc/150?u=vendor",
  onLogout,
}) => {

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-divider px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {showMenuButton && onMenuClick && (
          <Button
            isIconOnly
            className="hidden lg:flex"
            size="sm"
            variant="light"
            onPress={onMenuClick}
          >
            <FiMenu size={20} />
          </Button>
        )}

        <h1 className="text-xl font-semibold text-default-700 ml-8 lg:ml-0">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              className="p-0 h-auto bg-transparent data-[hover=true]:bg-transparent"
              variant="light"
            >
              <User
                avatarProps={{
                  size: "sm",
                  src: userAvatar,
                }}
                classNames={{
                  name: "text-sm font-semibold",
                  description: "text-xs",
                }}
                description={userEmail}
                name={userName}
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="User menu actions" variant="flat">
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              startContent={<FiLogOut size={18} />}
              onPress={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
};
