import { IEvent } from "@/types";
import { formatDate, formatTime } from "@/utils/date";
import { getCategoryImage, getCategoryLabel } from "@/utils/category";
import { getStatusColor, getStatusLabel, Role } from "@/utils/labels";

export const useEventCard = (event: IEvent, role: Role) => {
  const displayDate =
    event.confirmedDate || event.proposedDates?.[0] || event.createdAt;

  const categoryLabel = getCategoryLabel(event.category);
  const statusColor = getStatusColor(event.status);
  const statusLabel = getStatusLabel(role, event.status);
  const isGrayscale = event.status === "REJECTED" || event.status === "EXPIRED";
  const formattedDate = displayDate ? formatDate(displayDate) : null;
  const formattedTime = displayDate ? formatTime(displayDate) : null;
  const categoryImage = getCategoryImage(event.category);

  return {
    categoryLabel,
    statusColor,
    statusLabel,
    isGrayscale,
    formattedDate,
    formattedTime,
    displayDate,
    categoryImage,
  };
};
