import { useState } from "react";

import { mockEventRequests, EventRequest } from "@/data/mockEvents";

const useVendor = () => {
  const [events, setEvents] = useState<EventRequest[]>(mockEventRequests);

  const handleApprove = (eventId: string, selectedDate: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              status: "APPROVED" as const,
              remarks: `Approved for ${selectedDate}`,
            }
          : event,
      ),
    );

    // TODO: Send approval to backend
    // eslint-disable-next-line no-console
    console.log(`Approved event ${eventId} for date ${selectedDate}`);
  };

  const handleReject = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, status: "REJECTED" as const }
          : event,
      ),
    );

    // TODO: Send rejection to backend
    // eslint-disable-next-line no-console
    console.log(`Rejected event ${eventId}`);
  };

  const pendingEvents = events.filter((event) => event.status === "PENDING");
  const approvedEvents = events.filter((event) => event.status === "APPROVED");
  const rejectedEvents = events.filter((event) => event.status === "REJECTED");

  return {
    events,
    handleApprove,
    handleReject,
    pendingEvents,
    approvedEvents,
    rejectedEvents,
  };
};

export default useVendor;
