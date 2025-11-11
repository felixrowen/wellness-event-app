import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { FiX, FiAlertCircle } from "react-icons/fi";

import { IEvent } from "@/types";

interface RejectEventModalProps {
  event: IEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onReject: (eventId: string, rejectionReason: string) => void;
  isLoading?: boolean;
}

export function RejectEventModal({
  event,
  isOpen,
  onClose,
  onReject,
  isLoading = false,
}: RejectEventModalProps) {
  const [rejectionReason, setRejectionReason] = useState<string>("");

  const handleReject = () => {
    if (!rejectionReason.trim() || !event) return;
    onReject(event._id, rejectionReason);
    setRejectionReason("");
  };

  const handleClose = () => {
    setRejectionReason("");
    onClose();
  };

  if (!event) return null;

  return (
    <Modal isOpen={isOpen} size="lg" onClose={handleClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <FiX className="text-danger" size={24} />
              <span>Reject Event</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FiAlertCircle className="text-danger-600 text-xl mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-danger-900">
                        You are about to reject this event
                      </p>
                      <p className="text-sm text-danger-700 mt-1">
                        Please provide a reason for the rejection.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-default-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-default-600">
                    {event.description}
                  </p>
                </div>

                <Textarea
                  isRequired
                  label="Rejection Reason"
                  minRows={4}
                  placeholder="Please explain why you are rejecting this event..."
                  value={rejectionReason}
                  variant="bordered"
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onCloseModal}>
                Cancel
              </Button>
              <Button
                color="danger"
                isDisabled={!rejectionReason.trim() || isLoading}
                isLoading={isLoading}
                startContent={<FiX size={18} />}
                onPress={handleReject}
              >
                Reject Event
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
