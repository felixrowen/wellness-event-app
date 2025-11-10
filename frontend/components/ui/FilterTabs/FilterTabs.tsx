import { FC } from "react";
import { Tabs, Tab } from "@heroui/react";

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
  return (
    <Tabs
      selectedKey={selectedKey || tabs[0]?.key || ""}
      onSelectionChange={(key) => {
        const tabKey = String(key);

        onSelectionChange(tabKey === tabs[0]?.key ? null : tabKey);
      }}
    >
      {tabs.map((tab) => (
        <Tab key={tab.key} title={`${tab.label} (${tab.count})`} />
      ))}
    </Tabs>
  );
};

export default FilterTabs;
