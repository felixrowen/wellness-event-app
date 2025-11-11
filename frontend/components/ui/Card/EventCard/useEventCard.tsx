import { IEvent } from "@/types";
import { formatDate, formatTime, getCategoryLabel } from "@/utils/helpers";

export const useEventCard = (event: IEvent) => {
  const getStatusColor = (
    status: string,
  ): "default" | "primary" | "secondary" | "success" | "warning" | "danger" => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "danger";
      case "PENDING":
      case "AWAITING_VENDOR_PROPOSAL":
        return "warning";
      case "AWAITING_HR_APPROVAL":
        return "primary";
      case "COMPLETE":
        return "success";
      case "EXPIRED":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "AWAITING_VENDOR_PROPOSAL":
        return "Awaiting Proposal";
      case "AWAITING_HR_APPROVAL":
        return "Awaiting Approval";
      default:
        return status.charAt(0) + status.slice(1).toLowerCase();
    }
  };

  const displayDate =
    event.confirmedDate || event.proposedDates?.[0] || event.createdAt;

  const categoryLabel = getCategoryLabel(event.category);
  const statusColor = getStatusColor(event.status);
  const statusLabel = getStatusLabel(event.status);
  const isGrayscale = event.status === "REJECTED" || event.status === "EXPIRED";
  const formattedDate = displayDate ? formatDate(displayDate) : null;
  const formattedTime = displayDate ? formatTime(displayDate) : null;

  return {
    categoryLabel,
    statusColor,
    statusLabel,
    isGrayscale,
    formattedDate,
    formattedTime,
    displayDate,
  };
};
