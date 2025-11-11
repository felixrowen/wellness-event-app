import { FC } from "react";
import { Tabs, Tab, Chip } from "@heroui/react";

export interface FilterTab {
  key: string;
  label: string;
  count: number;
}

export interface FilterTabsProps {
  tabs: FilterTab[];
  selectedKey: string | null;
  onSelectionChange: (key: string | null) => void;
}

const FilterTabs: FC<FilterTabsProps> = ({
  tabs,
  selectedKey,
  onSelectionChange,
}) => {
  const getTabTitle = (tab: FilterTab) => {
    const isAwaitingApproval = tab.key === "AWAITING_HR_APPROVAL";
    const isApproved = tab.key === "APPROVED";

    if (isAwaitingApproval && tab.count > 0) {
      return (
        <div className="flex items-center gap-2">
          <span>{tab.label}</span>
          <Chip color="danger" size="sm" variant="flat">
            {tab.count}
          </Chip>
        </div>
      );
    }

    if (isApproved && tab.count > 0) {
      return (
        <div className="flex items-center gap-2">
          <span>{tab.label}</span>
          <Chip color="success" size="sm" variant="flat">
            {tab.count}
          </Chip>
        </div>
      );
    }

    return `${tab.label} (${tab.count})`;
  };

  return (
    <Tabs
      selectedKey={selectedKey || tabs[0]?.key || ""}
      onSelectionChange={(key) => {
        const tabKey = String(key);

        onSelectionChange(tabKey === tabs[0]?.key ? null : tabKey);
      }}
    >
      {tabs.map((tab) => (
        <Tab key={tab.key} title={getTabTitle(tab)} />
      ))}
    </Tabs>
  );
};

export default FilterTabs;
