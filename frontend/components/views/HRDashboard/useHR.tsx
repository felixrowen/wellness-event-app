import { useState } from "react";

import { getEventsByCompany, EventRequest } from "@/data/mockEvents";
import { CreateEventData } from "@/components/ui/Modal/CreateEventModal";

const useHR = () => {
  const [events, setEvents] = useState<EventRequest[]>(
    getEventsByCompany("TechCorp Ltd"),
  );
  const [selectedEvent, setSelectedEvent] = useState<EventRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  return {
    events,
    selectedEvent,
    isModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    handleViewEvent,
    handleCloseModal,
    handleCreateEvent,
    pendingCount,
    approvedCount,
    rejectedCount,
  };
};

export default useHR;
