import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DatePicker,
} from "@heroui/react";
import { useState } from "react";
import { FiCalendar, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  parseDateTime,
  today,
  getLocalTimeZone,
} from "@internationalized/date";

import { IEvent } from "@/types";

interface ProposeNewDatesModalProps {
  event: IEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onPropose: (eventId: string, proposedDates: string[]) => void;
  isLoading?: boolean;
}

export function ProposeNewDatesModal({
  event,
  isOpen,
  onClose,
  onPropose,
  isLoading = false,
}: ProposeNewDatesModalProps) {
  const [proposedDates, setProposedDates] = useState<string[]>([""]);

  const handleAddDate = () => {
    if (proposedDates.length < 3) {
      setProposedDates([...proposedDates, ""]);
    }
  };

  const handleRemoveDate = (index: number) => {
    const newDates = proposedDates.filter((_, i) => i !== index);

    setProposedDates(newDates.length > 0 ? newDates : [""]);
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...proposedDates];

    newDates[index] = value;
    setProposedDates(newDates);
  };

  const handlePropose = () => {
    if (!event) return;
    const validDates = proposedDates.filter((date) => date !== "");

    if (validDates.length === 0) return;
    onPropose(event._id, validDates);
    setProposedDates([""]);
  };

  const handleClose = () => {
    setProposedDates([""]);
    onClose();
  };

  const hasValidDates = proposedDates.some((date) => date !== "");

  if (!event) return null;

  return (
    <Modal isOpen={isOpen} size="lg" onClose={handleClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <FiCalendar className="text-primary" size={24} />
              <span>Propose New Dates</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-default-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-default-600">
                    Propose alternative dates for this event (max 3 dates)
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      Proposed Dates ({proposedDates.length}/3)
                    </p>
                    {proposedDates.length < 3 && (
                      <Button
                        isIconOnly
                        color="primary"
                        size="sm"
                        type="button"
                        variant="flat"
                        onPress={handleAddDate}
                      >
                        <FiPlus size={18} />
                      </Button>
                    )}
                  </div>

                  {proposedDates.map((date, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <DatePicker
                        className="flex-1"
                        granularity="second"
                        label={`Date Option ${index + 1}`}
                        minValue={today(getLocalTimeZone())}
                        popoverProps={{
                          placement: "top",
                        }}
                        value={date ? parseDateTime(date) : null}
                        variant="bordered"
                        onChange={(value) => {
                          if (value) {
                            const isoDate = `${value.year}-${String(value.month).padStart(2, "0")}-${String(value.day).padStart(2, "0")}T${String(value.hour).padStart(2, "0")}:${String(value.minute).padStart(2, "0")}:${String(value.second).padStart(2, "0")}`;

                            handleDateChange(index, isoDate);
                          } else {
                            handleDateChange(index, "");
                          }
                        }}
                      />
                      {proposedDates.length > 1 && (
                        <Button
                          isIconOnly
                          size="lg"
                          type="button"
                          variant="flat"
                          onPress={() => handleRemoveDate(index)}
                        >
                          <FiTrash2 size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onCloseModal}>
                Cancel
              </Button>
              <Button
                color="primary"
                isDisabled={!hasValidDates || isLoading}
                isLoading={isLoading}
                startContent={<FiCalendar size={18} />}
                onPress={handlePropose}
              >
                Propose Dates
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
