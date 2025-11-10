import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import { FiEye, FiPlus } from "react-icons/fi";
import { useRouter } from "next/router";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { getEventsByCompany, EventRequest } from "@/data/mockEvents";
import { EventDetailModal } from "@/components/ui/Modal/EventDetailModal";
import {
  CreateEventModal,
  CreateEventData,
} from "@/components/ui/Modal/CreateEventModal";

export default function HRDashboardPage() {
  const router = useRouter();
  // Mock: Get events for TechCorp Ltd (mock data)
  const [events, setEvents] = useState<EventRequest[]>(
    getEventsByCompany("TechCorp Ltd")
  );
  const [selectedEvent, setSelectedEvent] = useState<EventRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");

    if (!isAuthenticated) {
      router.push("/auth/login");

      return;
    }

    if (userRole === "VENDOR") {
      router.push("/dashboard");

      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return null;
  }

  const handleViewEvent = (event: EventRequest) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCreateEvent = (eventData: CreateEventData) => {
    // TODO: API call to create event
    const newEvent: EventRequest = {
      id: (events.length + 1).toString(),
      eventName: eventData.eventName,
      vendorName: eventData.vendorName,
      category: eventData.category,
      proposedDates: [
        eventData.proposedDate1,
        eventData.proposedDate2,
        eventData.proposedDate3,
      ],
      proposedLocation: eventData.proposedLocation,
      capacity: eventData.capacity,
      registered: 0,
      status: "PENDING",
      dateCreated: new Date().toISOString(),
      imageUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
      confirmedDate: null,
      companyName: "TechCorp Ltd",
      remarks: "",
    };

    setEvents([newEvent, ...events]);
    setIsCreateModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-SG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (
    status: string
  ): "warning" | "success" | "danger" | "default" => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "danger";
      default:
        return "default";
    }
  };

  const pendingCount = events.filter((e) => e.status === "PENDING").length;
  const approvedCount = events.filter((e) => e.status === "APPROVED").length;
  const rejectedCount = events.filter((e) => e.status === "REJECTED").length;

  return (
    <DashboardLayout title="HR Admin Dashboard" type="hr">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-default-900">
              Event Requests
            </h2>
            <p className="text-default-500 mt-1">
              Manage your company&apos;s wellness events
            </p>
          </div>
          <Button
            color="primary"
            startContent={<FiPlus size={20} />}
            onPress={() => setIsCreateModalOpen(true)}
          >
            Create Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <p className="text-sm text-default-500">Total Events</p>
              <p className="text-3xl font-bold mt-1">{events.length}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-default-500">Pending</p>
              <p className="text-3xl font-bold mt-1 text-warning">
                {pendingCount}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-default-500">Approved</p>
              <p className="text-3xl font-bold mt-1 text-success">
                {approvedCount}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-default-500">Rejected</p>
              <p className="text-3xl font-bold mt-1 text-danger">
                {rejectedCount}
              </p>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">All Events</h3>
          </CardHeader>
          <CardBody>
            <Table aria-label="Events table">
              <TableHeader>
                <TableColumn>EVENT NAME</TableColumn>
                <TableColumn>VENDOR NAME</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>DATE CREATED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{event.eventName}</p>
                        <p className="text-sm text-default-500">
                          {event.category}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{event.vendorName}</TableCell>
                    <TableCell>
                      <div>
                        {event.confirmedDate ? (
                          <p className="font-medium">
                            {formatDate(event.confirmedDate)}
                          </p>
                        ) : (
                          <div className="text-sm">
                            {event.proposedDates
                              .slice(0, 2)
                              .map((date, idx) => (
                                <p key={idx}>{formatDate(date)}</p>
                              ))}
                            {event.proposedDates.length > 2 && (
                              <p className="text-default-400">
                                +{event.proposedDates.length - 2} more
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={getStatusColor(event.status)}
                        size="sm"
                        variant="flat"
                      >
                        {event.status}
                      </Chip>
                    </TableCell>
                    <TableCell>{formatDate(event.dateCreated)}</TableCell>
                    <TableCell>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleViewEvent(event)}
                      >
                        <FiEye size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>

      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        viewMode="hr"
        onClose={handleCloseModal}
      />

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </DashboardLayout>
  );
}
