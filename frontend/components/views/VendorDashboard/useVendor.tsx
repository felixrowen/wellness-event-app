import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";

import eventServices from "@/services/event.service";
import { IEvent } from "@/types";
import { ToasterContext } from "@/contexts/ToasterContext";

const useVendor = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const statusFromUrl = (router.query.status as string) || null;
  const viewFromUrl = (router.query.view as "card" | "list") || "card";

  const [statusFilter, setStatusFilter] = useState<string | null>(
    statusFromUrl
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
    (e) => e.status === "PENDING" || e.status === "AWAITING_VENDOR_PROPOSAL"
  ).length;
  const approvedCount = allEvents.filter((e) => e.status === "APPROVED").length;
  const rejectedCount = allEvents.filter((e) => e.status === "REJECTED").length;
  const completeCount = allEvents.filter((e) => e.status === "COMPLETE").length;
  const expiredCount = allEvents.filter((e) => e.status === "EXPIRED").length;
  const awaitingApprovalCount = allEvents.filter(
    (e) => e.status === "AWAITING_HR_APPROVAL"
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

  const handleOpenApprove = () => {
    setIsModalOpen(false);
    setIsApproveModalOpen(true);
  };

  const handleOpenReject = () => {
    setIsModalOpen(false);
    setIsRejectModalOpen(true);
  };

  const handleOpenPropose = () => {
    setIsModalOpen(false);
    setIsProposeModalOpen(true);
  };

  const handleCloseApproveModal = () => {
    setIsApproveModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCloseProposeModal = () => {
    setIsProposeModalOpen(false);
    setSelectedEvent(null);
  };

  const approveEventMutation = useMutation({
    mutationFn: ({
      eventId,
      confirmedDate,
    }: {
      eventId: string;
      confirmedDate: string;
    }) => eventServices.approveEvent(eventId, { confirmedDate }),
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Event approved successfully!",
      });
      setIsApproveModalOpen(false);
      setSelectedEvent(null);
      refetchEvents();
    },
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error?.response?.data?.message || "Failed to approve event",
      });
    },
  });

  const rejectEventMutation = useMutation({
    mutationFn: ({
      eventId,
      rejectionReason,
    }: {
      eventId: string;
      rejectionReason: string;
    }) => eventServices.rejectEvent(eventId, { rejectionReason }),
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Event rejected successfully",
      });
      setIsRejectModalOpen(false);
      setSelectedEvent(null);
      refetchEvents();
    },
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error?.response?.data?.message || "Failed to reject event",
      });
    },
  });

  const proposeNewDatesMutation = useMutation({
    mutationFn: ({
      eventId,
      proposedDates,
    }: {
      eventId: string;
      proposedDates: string[];
    }) => eventServices.approveEvent(eventId, { proposedDates }),
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "New dates proposed successfully!",
      });
      setIsProposeModalOpen(false);
      setSelectedEvent(null);
      refetchEvents();
    },
    onError: (error: any) => {
      setToaster({
        type: "error",
        message:
          error?.response?.data?.message || "Failed to propose new dates",
      });
    },
  });

  const handleApproveEvent = (eventId: string, confirmedDate: string) => {
    approveEventMutation.mutate({ eventId, confirmedDate });
  };

  const handleRejectEvent = (eventId: string, rejectionReason: string) => {
    rejectEventMutation.mutate({ eventId, rejectionReason });
  };

  const handleProposeNewDates = (eventId: string, proposedDates: string[]) => {
    proposeNewDatesMutation.mutate({ eventId, proposedDates });
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
      { shallow: true }
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
      { shallow: true }
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return {
    events: filteredEvents,
    selectedEvent,
    isModalOpen,
    isApproveModalOpen,
    isRejectModalOpen,
    isProposeModalOpen,
    handleViewEvent,
    handleCloseModal,
    handleOpenApprove,
    handleOpenReject,
    handleOpenPropose,
    handleCloseApproveModal,
    handleCloseRejectModal,
    handleCloseProposeModal,
    handleApproveEvent,
    handleRejectEvent,
    handleProposeNewDates,
    isApprovingEvent: approveEventMutation.isPending,
    isRejectingEvent: rejectEventMutation.isPending,
    isProposingDates: proposeNewDatesMutation.isPending,
    tabs,
    statusFilter,
    handleStatusChange,
    handleViewModeChange,
    viewMode: viewFromUrl,
    isTransitioning: isTransitioning || isLoadingEvents,
    refetchEvents,
  };
};

export default useVendor;
