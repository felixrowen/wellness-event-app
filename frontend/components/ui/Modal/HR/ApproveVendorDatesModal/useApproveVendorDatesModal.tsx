import { useState } from "react";

import { IEvent } from "@/types";
import { formatDate } from "@/utils/helpers";

interface UseApproveVendorDatesModalProps {
  event: IEvent | null;
  onApprove: (eventId: string, confirmedDate: string) => void;
  onClose: () => void;
}

export function useApproveVendorDatesModal({
  event,
  onApprove,
  onClose,
}: UseApproveVendorDatesModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const formattedDates =
    event?.proposedDates?.map((date) => ({
      original: date,
      formatted: formatDate(date),
    })) || [];

  const hasProposedDates = formattedDates.length > 0;

  const handleApprove = () => {
    if (!event?._id || !selectedDate) return;
    onApprove(event._id, selectedDate);
  };

  const handleClose = () => {
    setSelectedDate("");
    onClose();
  };

  return {
    selectedDate,
    setSelectedDate,
    formattedDates,
    hasProposedDates,
    handleApprove,
    handleClose,
  };
}
