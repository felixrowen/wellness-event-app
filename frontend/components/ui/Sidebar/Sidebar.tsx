import { FC, ReactNode } from "react";
import { Card, CardBody, Divider, Button } from "@heroui/react";
import clsx from "clsx";
import { useRouter } from "next/router";

export interface SidebarItem {
  key: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  collapsed?: boolean;
  width?: string;
  onItemClick?: (key: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  sections,
  className,
  header,
  footer,
  collapsed = false,
  width = "280px",
  onItemClick,
}) => {
  const router = useRouter();

  const handleItemClick = (item: SidebarItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (item.href) {
      router.push(item.href);
    }
    if (onItemClick) {
      onItemClick(item.key);
    }
  };

  const isItemActive = (item: SidebarItem) => {
    if (item.isActive !== undefined) {
      return item.isActive;
    }
    if (item.href) {
      return router.pathname === item.href;
    }

    return false;
  };

  return (
    <aside
      className={clsx(
        "h-full flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "",
        className,
      )}
      style={{ width: collapsed ? "64px" : width }}
    >
      <Card className="h-full rounded-none shadow-none border-r border-divider">
        <CardBody className="p-0 flex flex-col h-full overflow-hidden">
          {header && (
            <>
              <div className="px-4 py-6">{header}</div>
              <Divider />
            </>
          )}

          <nav className="flex-1 overflow-y-auto py-4">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6 last:mb-0">
                {section.title && !collapsed && (
                  <div className="px-4 mb-2">
                    <span className="text-xs font-semibold text-default-400 uppercase tracking-wider">
                      {section.title}
                    </span>
                  </div>
                )}

                <div className="space-y-1 px-2">
                  {section.items.map((item) => {
                    const isActive = isItemActive(item);

                    return (
                      <Button
                        key={item.key}
                        className={clsx(
                          "w-full justify-start h-auto py-3 px-3",
                          "transition-all duration-200",
                          collapsed ? "px-2" : "",
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "bg-transparent text-default-700 hover:bg-default-100",
                        )}
                        startContent={
                          item.icon && (
                            <span
                              className={clsx(
                                "flex-shrink-0",
                                isActive
                                  ? "text-primary-foreground"
                                  : "text-default-500",
                              )}
                            >
                              {item.icon}
                            </span>
                          )
                        }
                        variant={isActive ? "solid" : "light"}
                        onPress={() => handleItemClick(item)}
                      >
                        {!collapsed && (
                          <span className="flex-1 text-left text-sm">
                            {item.label}
                          </span>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {footer && (
            <>
              <Divider />
              <div className="px-4 py-4">{footer}</div>
            </>
          )}
        </CardBody>
      </Card>
    </aside>
  );
};
