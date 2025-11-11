import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
  Card,
  CardBody,
} from "@heroui/react";
import { FiCheck, FiCalendar } from "react-icons/fi";
import { useState } from "react";

import { IEvent } from "@/types";

interface ApproveVendorDatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: IEvent | null;
  onApprove: (eventId: string, confirmedDate: string) => void;
  isLoading?: boolean;
}

export function ApproveVendorDatesModal({
  isOpen,
  onClose,
  event,
  onApprove,
  isLoading = false,
}: ApproveVendorDatesModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleApprove = () => {
    if (!event?._id || !selectedDate) return;
    onApprove(event._id, selectedDate);
  };

  const handleClose = () => {
    setSelectedDate("");
    onClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleDateString("en-US", options);
  };

  if (!event) return null;

  return (
    <Modal isOpen={isOpen} size="lg" onClose={handleClose}>
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-success-600" size={24} />
                <h3 className="text-xl font-bold">
                  Approve Vendor&apos;s Dates
                </h3>
              </div>
            </ModalHeader>

            <ModalBody>
              <div className="space-y-4">
                <p className="text-default-600">
                  Select one of the dates proposed by the vendor to confirm this
                  event.
                </p>

                <Card className="bg-default-50">
                  <CardBody>
                    <p className="text-sm font-semibold text-default-700 mb-1">
                      Event: {event.title}
                    </p>
                    <p className="text-sm text-default-600">
                      {event.description}
                    </p>
                  </CardBody>
                </Card>

                {event.proposedDates && event.proposedDates.length > 0 ? (
                  <RadioGroup
                    label="Select a date to approve"
                    value={selectedDate}
                    onValueChange={setSelectedDate}
                  >
                    {event.proposedDates.map((date, index) => (
                      <Radio
                        key={index}
                        classNames={{
                          base: "inline-flex m-0 bg-default-100 hover:bg-default-200 items-center justify-between flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent data-[selected=true]:border-success-500",
                        }}
                        value={date}
                      >
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-semibold text-default-900">
                            {formatDate(date)}
                          </p>
                        </div>
                      </Radio>
                    ))}
                  </RadioGroup>
                ) : (
                  <Card className="bg-warning-50 border border-warning-200">
                    <CardBody>
                      <p className="text-warning-800">
                        No dates have been proposed yet.
                      </p>
                    </CardBody>
                  </Card>
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                isDisabled={isLoading}
                variant="light"
                onPress={handleClose}
              >
                Cancel
              </Button>
              <Button
                color="success"
                isDisabled={!selectedDate}
                isLoading={isLoading}
                startContent={!isLoading && <FiCheck size={18} />}
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
