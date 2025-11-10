import { useEffect, useState } from "react";
import { Button, ButtonGroup, Skeleton, Card } from "@heroui/react";
import { useRouter } from "next/router";
import { FiGrid, FiList } from "react-icons/fi";

import useVendor from "./useVendor";

import { EventCard } from "@/components/ui/Card/EventCard";
import FilterTabs from "@/components/ui/FilterTabs";
import EventTable from "@/components/ui/Table/EventTable";

const VendorDashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const {
    events,
    allEventsCount,
    handleApprove,
    handleReject,
    pendingEvents,
    approvedEvents,
    rejectedEvents,
    statusFilter,
    handleStatusChange,
    handleViewModeChange,
    viewMode,
    isTransitioning,
  } = useVendor();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");

    if (!isAuthenticated) {
      router.push("/auth/login");

      return;
    }

    if (userRole === "HR") {
      router.push("/hr/dashboard");

      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="space-y-6">
      {allEventsCount > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-default-900">
              My Events
            </h3>
            <div className="flex items-center justify-between gap-4">
              <FilterTabs
                selectedKey={statusFilter}
                tabs={[
                  { key: "ALL", label: "All", count: allEventsCount },
                  {
                    key: "PENDING",
                    label: "Pending",
                    count: pendingEvents.length,
                  },
                  {
                    key: "APPROVED",
                    label: "Approved",
                    count: approvedEvents.length,
                  },
                  {
                    key: "REJECTED",
                    label: "Rejected",
                    count: rejectedEvents.length,
                  },
                ]}
                onSelectionChange={handleStatusChange}
              />
              <ButtonGroup size="sm" variant="flat">
                <Button
                  isIconOnly
                  color={viewMode === "card" ? "primary" : "default"}
                  onPress={() => handleViewModeChange("card")}
                >
                  <FiGrid size={18} />
                </Button>
                <Button
                  isIconOnly
                  color={viewMode === "list" ? "primary" : "default"}
                  onPress={() => handleViewModeChange("list")}
                >
                  <FiList size={18} />
                </Button>
              </ButtonGroup>
            </div>
          </div>
          {viewMode === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isTransitioning
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Card
                      key={index}
                      className="w-full space-y-5 p-4"
                      radius="lg"
                    >
                      <Skeleton className="rounded-lg">
                        <div className="h-48 rounded-lg bg-default-300" />
                      </Skeleton>
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                        </Skeleton>
                      </div>
                    </Card>
                  ))
                : events.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  ))}
            </div>
          ) : (
            <EventTable events={events} isLoading={isTransitioning} />
          )}
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
