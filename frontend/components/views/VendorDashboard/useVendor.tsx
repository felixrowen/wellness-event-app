import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { mockEventRequests, EventRequest } from "@/data/mockEvents";

const useVendor = () => {
  const router = useRouter();
  const [events, setEvents] = useState<EventRequest[]>(mockEventRequests);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const statusFromUrl = (router.query.status as string) || null;
  const viewFromUrl = (router.query.view as "card" | "list") || "card";

  const [statusFilter, setStatusFilter] = useState<string | null>(
    statusFromUrl,
  );

  useEffect(() => {
    if (statusFromUrl !== statusFilter) {
      setStatusFilter(statusFromUrl);
    }
  }, [statusFromUrl, statusFilter]);

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
  const cancelledEvents = events.filter(
    (event) => event.status === "CANCELLED",
  );
  const expiredEvents = events.filter((event) => event.status === "EXPIRED");
  const doneEvents = events.filter((event) => event.status === "DONE");

  const tabs = [
    { key: "ALL", label: "All", count: events.length },
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
    {
      key: "CANCELLED",
      label: "Cancelled",
      count: cancelledEvents.length,
    },
    {
      key: "EXPIRED",
      label: "Expired",
      count: expiredEvents.length,
    },
    {
      key: "DONE",
      label: "Done",
      count: doneEvents.length,
    },
  ];

  const filteredEvents = statusFilter
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

  const handleViewModeChange = (mode: "card" | "list") => {
    setIsTransitioning(true);

    const query = { ...router.query };

    query.view = mode;

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
    handleApprove,
    handleReject,
    tabs,
    statusFilter,
    handleStatusChange,
    handleViewModeChange,
    viewMode: viewFromUrl,
    isTransitioning,
  };
};

export default useVendor;
