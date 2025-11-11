import { useMemo, useState } from "react";

import { IEvent, EVENT_CATEGORY_LABELS, EVENT_CATEGORY } from "@/types";
import { Role, getStatusLabel, getStatusColor } from "@/utils/labels";
import { formatDateFull } from "@/utils/date";

interface UseEventDetailModalProps {
  event: IEvent | null;
  viewMode: "hr" | "vendor";
}

export function useEventDetailModal({
  event,
  viewMode,
}: UseEventDetailModalProps) {
  const [copiedId, setCopiedId] = useState(false);

  const userRole: Role = viewMode === "hr" ? "HR" : "VENDOR";

  const statusInfo = useMemo(() => {
    if (!event) return null;

    return {
      label: getStatusLabel(userRole, event.status),
      color: getStatusColor(event.status),
    };
  }, [event, userRole]);

  const categoryLabel = useMemo(() => {
    if (!event) return "Unknown";

    return EVENT_CATEGORY_LABELS[event.category as EVENT_CATEGORY] || "Unknown";
  }, [event]);

  const formattedDates = useMemo(() => {
    if (!event) return { proposed: [], confirmed: null };

    const proposed = event.proposedDates.map((date) => ({
      formatted: formatDateFull(date),
      full: date,
    }));

    const confirmed = event.confirmedDate
      ? {
          formatted: formatDateFull(event.confirmedDate),
          full: event.confirmedDate,
        }
      : null;

    return { proposed, confirmed };
  }, [event]);

  const formattedCreatedDate = useMemo(() => {
    if (!event?.createdAt) return null;

    return formatDateFull(event.createdAt);
  }, [event]);

  const hasRejectionReason = useMemo(() => {
    return event?.status === "REJECTED" && !!event.rejectionReason;
  }, [event]);

  const canCancel = useMemo(() => {
    if (viewMode !== "hr" || !event) return false;

    return (
      event.status !== "COMPLETE" &&
      event.status !== "EXPIRED" &&
      event.status !== "REJECTED"
    );
  }, [viewMode, event]);

  const showVendorPendingActions = useMemo(() => {
    return viewMode === "vendor" && event?.status === "PENDING";
  }, [viewMode, event]);

  const showVendorProposalActions = useMemo(() => {
    return (
      viewMode === "vendor" && event?.status === "AWAITING_VENDOR_PROPOSAL"
    );
  }, [viewMode, event]);

  const showHrApprovalActions = useMemo(() => {
    return viewMode === "hr" && event?.status === "AWAITING_HR_APPROVAL";
  }, [viewMode, event]);

  const handleCopyId = async () => {
    if (!event?._id) return;
    await navigator.clipboard.writeText(event._id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return {
    userRole,
    statusInfo,
    categoryLabel,
    formattedDates,
    formattedCreatedDate,
    hasRejectionReason,
    canCancel,
    showVendorPendingActions,
    showVendorProposalActions,
    showHrApprovalActions,
    handleCopyId,
    copiedId,
  };
}
