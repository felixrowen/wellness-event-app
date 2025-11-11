const STATUS_COLORS: Record<string, string> = {
  PENDING: "yellow",
  APPROVED: "green",
  REJECTED: "red",
  CANCELLED: "gray",
  EXPIRED: "gray",
  AWAITING_VENDOR_PROPOSAL: "yellow",
  AWAITING_HR_APPROVAL: "yellow",
  DONE: "blue",
};

export const STATUS_LABELS = {
  HR: {
    PENDING: "Waiting for vendor response",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    CANCELLED: "Cancelled",
    EXPIRED: "Expired - No response",
    AWAITING_VENDOR_PROPOSAL: "Awaiting vendor proposal",
    AWAITING_HR_APPROVAL: "Awaiting your approval",
    DONE: "Event completed",
  },
  VENDOR: {
    PENDING: "Awaiting your action",
    APPROVED: "On Progress",
    REJECTED: "Rejected",
    CANCELLED: "Cancelled by Company",
    EXPIRED: "Expired",
    AWAITING_VENDOR_PROPOSAL: "Please propose dates",
    AWAITING_HR_APPROVAL: "Waiting for HR approval",
    DONE: "Event completed",
  },
} as const;

export type Role = "HR" | "VENDOR";
export type StatusKey = keyof typeof STATUS_LABELS.HR;

export function getStatusLabel(role: Role, status: string) {
  return STATUS_LABELS[role][status as StatusKey] || status;
}

export function getStatusColor(
  status: string,
): "warning" | "success" | "danger" | "default" {
  const color = STATUS_COLORS[status] || "gray";

  switch (color) {
    case "yellow":
      return "warning";
    case "green":
      return "success";
    case "red":
      return "danger";
    case "blue":
      return "default";
    default:
      return "default";
  }
}
