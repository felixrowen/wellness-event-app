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
import { FiX } from "react-icons/fi";

import { Banner } from "@/components/ui/Banner";
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
                <Banner
                  description="Please provide a reason for the rejection."
                  title="You are about to reject this event"
                  variant="danger"
                />

                <div>
                  <div>
                    <span className="text-sm">Title:</span>
                    <h3 className="text-sm font-semibold text-default-900 mb-2">
                      {event.title}
                    </h3>
                  </div>
                  <div>
                    <span className="text-sm">Description:</span>
                    <p className="text-sm text-default-600 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
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
