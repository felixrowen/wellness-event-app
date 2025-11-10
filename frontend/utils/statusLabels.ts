export const STATUS_LABELS = {
  HR: {
    PENDING: { text: "Waiting for vendor response", color: "yellow" },
    APPROVED: { text: "Approved by vendor", color: "green" },
    REJECTED: { text: "Rejected by vendor", color: "red" },
    CANCELLED: { text: "Cancelled", color: "gray" },
    EXPIRED: { text: "Expired - No response", color: "gray" },
    DONE: { text: "Event completed", color: "blue" },
  },
  VENDOR: {
    PENDING: { text: "Awaiting your action", color: "yellow" },
    APPROVED: { text: "On Progress", color: "green" },
    REJECTED: { text: "You rejected", color: "red" },
    CANCELLED: { text: "Cancelled by Company", color: "gray" },
    EXPIRED: { text: "Expired", color: "gray" },
    DONE: { text: "Event completed", color: "blue" },
  },
} as const;

export type Role = "HR" | "VENDOR";
export type StatusKey = keyof typeof STATUS_LABELS.HR;

export function getStatusLabel(role: Role, status: string) {
  return (
    STATUS_LABELS[role][status as StatusKey] || { text: status, color: "gray" }
  );
}

export function getStatusColor(
  role: Role,
  status: string,
): "warning" | "success" | "danger" | "default" {
  const label = getStatusLabel(role, status);

  switch (label.color) {
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

export function getStatusBgColor(role: Role, status: string): string {
  const label = getStatusLabel(role, status);

  switch (label.color) {
    case "yellow":
      return "bg-yellow-500";
    case "green":
      return "bg-green-500";
    case "red":
      return "bg-red-500";
    case "blue":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
}

export function getStatusTextColor(role: Role, status: string): string {
  const label = getStatusLabel(role, status);

  switch (label.color) {
    case "yellow":
      return "text-yellow-700";
    case "green":
      return "text-green-700";
    case "red":
      return "text-red-700";
    case "blue":
      return "text-blue-700";
    default:
      return "text-gray-700";
  }
}
