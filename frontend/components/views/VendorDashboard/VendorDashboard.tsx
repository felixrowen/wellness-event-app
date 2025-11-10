import { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { useRouter } from "next/router";

import useVendor from "./useVendor";

import { EventCard } from "@/components/ui/Card/EventCard";

const VendorDashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const {
    events,
    handleApprove,
    handleReject,
    pendingEvents,
    approvedEvents,
    rejectedEvents,
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
      {events.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-default-900">
              All Events
            </h3>
            <Chip color="default" size="sm" variant="flat">
              All: {events.length}
            </Chip>
            <Chip color="warning" size="sm" variant="flat">
              Pending: {pendingEvents.length}
            </Chip>
            <Chip color="success" size="sm" variant="flat">
              Approved: {approvedEvents.length}
            </Chip>
            <Chip color="danger" size="sm" variant="flat">
              Rejected: {rejectedEvents.length}
            </Chip>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
