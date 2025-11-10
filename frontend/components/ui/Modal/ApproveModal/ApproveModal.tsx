import { useState } from "react";
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

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedDate: string) => void;
  eventName: string;
  proposedDates: string[];
}

export function ApproveModal({
  isOpen,
  onClose,
  onSubmit,
  eventName,
  proposedDates,
}: ApproveModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-SG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      alert("Please select a date");

      return;
    }

    onSubmit(selectedDate);
    setSelectedDate("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="lg" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h3 className="text-xl font-bold">Approve Event</h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p>
                  You are about to approve the event:{" "}
                  <span className="font-semibold">{eventName}</span>
                </p>
                <div>
                  <p className="text-sm font-medium mb-3">
                    Select a confirmed date:
                  </p>
                  <RadioGroup
                    value={selectedDate}
                    onValueChange={setSelectedDate}
                  >
                    {proposedDates.map((date, index) => (
                      <Radio key={index} value={date}>
                        <div>
                          <p className="font-medium">Option {index + 1}</p>
                          <p className="text-sm text-default-500">
                            {formatDate(date)}
                          </p>
                        </div>
                      </Radio>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="success" onPress={handleSubmit}>
                Approve Event
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
