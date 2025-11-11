import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { FiAlertCircle } from "react-icons/fi";

interface EventDetailDeleteProps {
  isOpen: boolean;
  isCancelling: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function EventDetailDelete({
  isOpen,
  isCancelling,
  onClose,
  onConfirm,
}: EventDetailDeleteProps) {
  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader>Confirm Cancellation</ModalHeader>
            <ModalBody>
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-danger-600 text-2xl mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-default-900 mb-2">
                    Are you sure you want to cancel this event?
                  </p>
                  <p className="text-sm text-default-600">
                    This will permanently delete the event. This action cannot
                    be undone.
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={isCancelling}
                variant="light"
                onPress={onCloseModal}
              >
                No, Keep Event
              </Button>
              <Button
                color="danger"
                isLoading={isCancelling}
                onPress={onConfirm}
              >
                Yes, Cancel Event
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
