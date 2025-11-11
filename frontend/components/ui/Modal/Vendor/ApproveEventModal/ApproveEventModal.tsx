import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { useState } from "react";
import { FiCalendar, FiCheck } from "react-icons/fi";

import { IEvent } from "@/types";

interface ApproveEventModalProps {
  event: IEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (eventId: string, confirmedDate: string) => void;
  isLoading?: boolean;
}

export function ApproveEventModal({
  event,
  isOpen,
  onClose,
  onApprove,
  isLoading = false,
}: ApproveEventModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleApprove = () => {
    if (!selectedDate || !event) return;
    onApprove(event._id, selectedDate);
    setSelectedDate("");
  };

  const handleClose = () => {
    setSelectedDate("");
    onClose();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!event) return null;

  return (
    <Modal isOpen={isOpen} size="lg" onClose={handleClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <FiCheck className="text-success" size={24} />
              <span>Approve Event</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-default-600 mb-2">
                    Select a date to confirm for this event:
                  </p>
                  <h3 className="text-lg font-semibold text-default-900">
                    {event.title}
                  </h3>
                </div>

                {event.proposedDates && event.proposedDates.length > 0 ? (
                  <RadioGroup
                    label="Choose a date"
                    value={selectedDate}
                    onValueChange={setSelectedDate}
                  >
                    {event.proposedDates.map((date) => (
                      <Radio key={date} value={date}>
                        <div className="flex items-center gap-2">
                          <FiCalendar size={16} />
                          <span>{formatDate(date)}</span>
                        </div>
                      </Radio>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                    <p className="text-sm text-warning-800">
                      No proposed dates available. Please propose new dates
                      instead.
                    </p>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onCloseModal}>
                Cancel
              </Button>
              <Button
                color="success"
                isDisabled={!selectedDate || isLoading}
                isLoading={isLoading}
                startContent={<FiCheck size={18} />}
                onPress={handleApprove}
              >
                Approve Event
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
