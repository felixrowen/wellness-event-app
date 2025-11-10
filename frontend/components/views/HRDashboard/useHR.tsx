import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { getEventsByCompany, EventRequest } from "@/data/mockEvents";
import { CreateEventData } from "@/components/ui/Modal/CreateEventModal";

const useHR = () => {
  const router = useRouter();
  const [events, setEvents] = useState<EventRequest[]>(
    getEventsByCompany("TechCorp Ltd"),
  );
  const [selectedEvent, setSelectedEvent] = useState<EventRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const statusFromUrl = (router.query.status as string) || null;
  const [statusFilter, setStatusFilter] = useState<string | null>(
    statusFromUrl,
  );

  useEffect(() => {
    if (statusFromUrl !== statusFilter) {
      setStatusFilter(statusFromUrl);
    }
  }, [statusFromUrl, statusFilter]);

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

  const pendingCount = events.filter((e) => e.status === "PENDING").length;
  const approvedCount = events.filter((e) => e.status === "APPROVED").length;
  const rejectedCount = events.filter((e) => e.status === "REJECTED").length;
  const cancelledCount = events.filter((e) => e.status === "CANCELLED").length;
  const expiredCount = events.filter((e) => e.status === "EXPIRED").length;
  const doneCount = events.filter((e) => e.status === "DONE").length;

  const tabs = [
    { key: "ALL", label: "All", count: events.length },
    { key: "PENDING", label: "Pending", count: pendingCount },
    { key: "APPROVED", label: "Approved", count: approvedCount },
    { key: "REJECTED", label: "Rejected", count: rejectedCount },
    { key: "CANCELLED", label: "Cancelled", count: cancelledCount },
    { key: "EXPIRED", label: "Expired", count: expiredCount },
    { key: "DONE", label: "Done", count: doneCount },
  ];

  const filteredEvents =
    statusFilter && statusFilter !== "ALL"
      ? events.filter((event) => event.status === statusFilter)
      : events;

  const handleStatusChange = (status: string | null) => {
    setIsTransitioning(true);
    setStatusFilter(status);

    const query = { ...router.query };

    if (status && status !== "ALL") {
      query.status = status;
    } else {
      delete query.status;
    }

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true },
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return {
    events: filteredEvents,
    selectedEvent,
    isModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    handleViewEvent,
    handleCloseModal,
    handleCreateEvent,
    tabs,
    statusFilter,
    handleStatusChange,
    isTransitioning,
  };
};

export default useHR;
