import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getEventsByCompany, EventRequest } from "@/data/mockEvents";
import { ICreateEventDTO } from "@/types";
import eventServices from "@/services/event.service";
import vendorServices from "@/services/vendor.service";
import { ToasterContext } from "@/contexts/ToasterContext";

const useHR = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const [events] = useState<EventRequest[]>(getEventsByCompany("TechCorp Ltd"));
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

  const {
    data: vendorsData,
    isLoading: isLoadingVendors,
    error: vendorsError,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      const response = await vendorServices.getAllVendors();

      return response.data.data.vendors;
    },
    enabled: isCreateModalOpen,
  });

  const createEventMutation = useMutation({
    mutationFn: (data: ICreateEventDTO) => eventServices.createEvent(data),
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Event created successfully!",
      });
      setIsCreateModalOpen(false);
    },
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error?.response?.data?.message || "Failed to create event",
      });
    },
  });

  const handleCreateEvent = (eventData: ICreateEventDTO) => {
    createEventMutation.mutate(eventData);
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
    isCreatingEvent: createEventMutation.isPending,
    vendorsData,
    isLoadingVendors,
    vendorsError,
  };
};

export default useHR;
