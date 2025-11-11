import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@heroui/react";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  eventName: string;
}

export function RejectModal({
  isOpen,
  onClose,
  onSubmit,
  eventName,
}: RejectModalProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) {
      alert("Please provide a rejection reason");

      return;
    }

    onSubmit(reason);
    setReason("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="lg" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h3 className="text-xl font-bold">Reject Event</h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p>
                  You are about to reject the event:{" "}
                  <span className="font-semibold">{eventName}</span>
                </p>
                <Textarea
                  isRequired
                  label="Rejection Reason"
                  minRows={4}
                  placeholder="Please provide a reason for rejection..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="danger" onPress={handleSubmit}>
                Reject Event
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
