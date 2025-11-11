import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ICreateEventDTO, IEvent } from "@/types";
import eventServices from "@/services/event.service";
import vendorServices from "@/services/vendor.service";
import { ToasterContext } from "@/contexts/ToasterContext";

const useHR = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
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

  const {
    data: eventsData,
    isLoading: isLoadingEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await eventServices.getEvents();

      return response.data.data;
    },
  });

  const allEvents = eventsData?.events || [];

  const pendingCount = allEvents.filter(
    (e) => e.status === "PENDING" || e.status === "AWAITING_VENDOR_PROPOSAL",
  ).length;
  const approvedCount = allEvents.filter((e) => e.status === "APPROVED").length;
  const rejectedCount = allEvents.filter((e) => e.status === "REJECTED").length;
  const completeCount = allEvents.filter((e) => e.status === "COMPLETE").length;
  const expiredCount = allEvents.filter((e) => e.status === "EXPIRED").length;
  const awaitingApprovalCount = allEvents.filter(
    (e) => e.status === "AWAITING_HR_APPROVAL",
  ).length;

  const filteredEvents =
    statusFilter && statusFilter !== "ALL"
      ? allEvents.filter((event) => {
          if (statusFilter === "PENDING") {
            return (
              event.status === "PENDING" ||
              event.status === "AWAITING_VENDOR_PROPOSAL"
            );
          }

          return event.status === statusFilter;
        })
      : allEvents;

  const handleViewEvent = (event: IEvent) => {
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
      refetchEvents();
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

  const tabs = [
    { key: "ALL", label: "All", count: allEvents.length },
    { key: "PENDING", label: "Pending", count: pendingCount },
    {
      key: "AWAITING_HR_APPROVAL",
      label: "Awaiting Approval",
      count: awaitingApprovalCount,
    },
    { key: "APPROVED", label: "Approved", count: approvedCount },
    { key: "REJECTED", label: "Rejected", count: rejectedCount },
    { key: "COMPLETE", label: "Complete", count: completeCount },
    { key: "EXPIRED", label: "Expired", count: expiredCount },
  ];

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
    isTransitioning: isTransitioning || isLoadingEvents,
    isCreatingEvent: createEventMutation.isPending,
    vendorsData,
    isLoadingVendors,
    vendorsError,
  };
};

export default useHR;
