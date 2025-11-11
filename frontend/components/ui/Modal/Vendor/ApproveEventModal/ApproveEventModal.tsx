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
import { formatDateFull } from "@/utils/date";

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
                  <p className="text-sm text-default-600">
                    Select a date to confirm for this event:
                  </p>
                  <span className="font-semibold text-default-900">
                    {event.title}
                  </span>
                </div>

                {event.proposedDates && event.proposedDates.length > 0 ? (
                  <RadioGroup
                    label="Choose a date:"
                    value={selectedDate}
                    onValueChange={setSelectedDate}
                  >
                    {event.proposedDates.map((date) => (
                      <Radio key={date} value={date}>
                        <div className="flex items-center gap-1">
                          <FiCalendar size={14} />
                          <span className="text-sm">
                            {formatDateFull(date)}
                          </span>
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
                className="text-default-700"
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
