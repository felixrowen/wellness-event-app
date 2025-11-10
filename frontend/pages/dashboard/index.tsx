import { useState, useEffect } from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import { useRouter } from "next/router";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { EventCard } from "@/components/ui/Card/EventCard";
import { mockEventRequests, EventRequest } from "@/data/mockEvents";

export default function DashboardPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventRequest[]>(mockEventRequests);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleApprove = (eventId: string, selectedDate: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              status: "APPROVED" as const,
              remarks: `Approved for ${selectedDate}`,
            }
          : event
      )
    );

    // TODO: Send approval to backend
    // eslint-disable-next-line no-console
    console.log(`Approved event ${eventId} for date ${selectedDate}`);
  };

  const handleReject = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, status: "REJECTED" as const } : event
      )
    );

    // TODO: Send rejection to backend
    // eslint-disable-next-line no-console
    console.log(`Rejected event ${eventId}`);
  };

  const pendingEvents = events.filter((event) => event.status === "PENDING");
  const approvedEvents = events.filter((event) => event.status === "APPROVED");
  const rejectedEvents = events.filter((event) => event.status === "REJECTED");

  return (
    <DashboardLayout title="Vendor Dashboard" type="vendor">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-default-900">
            Event Requests
          </h2>
          <p className="text-default-500 mt-1">
            Review and manage event requests from companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardBody className="flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-default-500">Pending Requests</p>
                <p className="text-3xl font-bold mt-1">
                  {pendingEvents.length}
                </p>
              </div>
              <Chip color="warning" size="lg" variant="flat">
                Pending
              </Chip>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-default-500">Approved</p>
                <p className="text-3xl font-bold mt-1">
                  {approvedEvents.length}
                </p>
              </div>
              <Chip color="success" size="lg" variant="flat">
                Approved
              </Chip>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-default-500">Rejected</p>
                <p className="text-3xl font-bold mt-1">
                  {rejectedEvents.length}
                </p>
              </div>
              <Chip color="danger" size="lg" variant="flat">
                Rejected
              </Chip>
            </CardBody>
          </Card>
        </div>

        {pendingEvents.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-default-900">
              Pending Requests
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pendingEvents.map((event) => (
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
    </DashboardLayout>
  );
}
