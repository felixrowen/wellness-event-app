import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Card,
  CardBody,
} from "@heroui/react";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUser,
  FiAlertCircle,
  FiInfo,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { useState } from "react";

import { useEventDetailModal } from "./useEventDetailModal";

import { IEvent } from "@/types";

interface EventDetailModalProps {
  event: IEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onCancelEvent?: (eventId: string) => void;
  isCancelling?: boolean;
  viewMode?: "hr" | "vendor";
}

export function EventDetailModal({
  event,
  isOpen,
  onClose,
  onCancelEvent,
  isCancelling = false,
  viewMode = "hr",
}: EventDetailModalProps) {
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const {
    statusInfo,
    categoryLabel,
    formattedDates,
    formattedCreatedDate,
    hasRejectionReason,
    isAwaitingAction,
    copiedId,
    handleCopyId,
  } = useEventDetailModal({ event, viewMode });

  const handleCancelClick = () => {
    if (event?._id && onCancelEvent) {
      onCancelEvent(event._id);
      setShowConfirmCancel(false);
    }
  };

  if (!event) return null;

  const canCancel =
    viewMode === "hr" &&
    event.status !== "COMPLETE" &&
    event.status !== "EXPIRED" &&
    event.status !== "REJECTED";

  // Confirmation dialog
  if (showConfirmCancel) {
    return (
      <Modal
        isOpen={isOpen}
        size="md"
        onClose={() => setShowConfirmCancel(false)}
      >
        <ModalContent>
          {(onCloseConfirm) => (
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
                  onPress={onCloseConfirm}
                >
                  No, Keep Event
                </Button>
                <Button
                  color="danger"
                  isLoading={isCancelling}
                  onPress={handleCancelClick}
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

  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" size="2xl" onClose={onClose}>
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-4 border-b border-default-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-default-900">
                    {event.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Chip size="sm" variant="flat">
                      {categoryLabel}
                    </Chip>

                    {statusInfo && (
                      <Chip color={statusInfo.color} size="sm" variant="flat">
                        {statusInfo.label.text}
                      </Chip>
                    )}
                  </div>
                </div>
              </div>
            </ModalHeader>

            <ModalBody className="py-6 space-y-8">
              {isAwaitingAction && (
                <Card className="bg-warning-50 border border-warning-200 shadow-sm">
                  <CardBody className="py-3">
                    <div className="flex items-start gap-3">
                      <FiAlertCircle
                        className="text-warning-600 mt-0.5 shrink-0"
                        size={20}
                      />
                      <div>
                        <p className="font-semibold text-warning-800">
                          Action Required
                        </p>
                        <p className="text-sm text-warning-700">
                          {viewMode === "hr"
                            ? "This event is awaiting your approval."
                            : "Please review and respond to this event."}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser className="text-default-400" size={16} />
                    <h4 className="text-sm font-semibold text-default-700">
                      Event ID
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="flex justify-between gap-2 items-center text-sm text-default-700 font-mono bg-default-100 px-2 rounded truncate">
                      <span>{event._id}</span>
                      <button
                        className="p-2 hover:bg-default-100 rounded transition-colors"
                        title={copiedId ? "Copied!" : "Copy to clipboard"}
                        type="button"
                        onClick={handleCopyId}
                      >
                        {copiedId ? (
                          <FiCheck className="text-success-600" size={16} />
                        ) : (
                          <FiCopy className="text-default-500" size={16} />
                        )}
                      </button>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FiClock className="text-default-400" size={16} />
                    <h4 className="text-sm font-semibold text-default-700">
                      Created
                    </h4>
                  </div>
                  {formattedCreatedDate && (
                    <div className="flex items-center gap-2 text-sm text-default-700 mt-3">
                      <p>{formattedCreatedDate.date}</p>
                      <span className="text-default-400">•</span>
                      <p>{formattedCreatedDate.time}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FiInfo className="text-default-500" size={18} />
                  <h4 className="text-sm font-semibold text-default-700">
                    Description
                  </h4>
                </div>
                <p className="text-sm text-default-600 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FiCalendar className="text-default-500" size={18} />
                  <h4 className="text-sm font-semibold text-default-700">
                    {formattedDates.confirmed
                      ? "Confirmed Date & Time"
                      : "Proposed Dates"}
                  </h4>
                </div>

                {formattedDates.confirmed ? (
                  <Card className="bg-success-50 border border-success-200 shadow-sm">
                    <CardBody className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-success-100 p-3 rounded-full">
                          <FiCalendar className="text-success-700" size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-success-800 text-lg">
                            {formattedDates.confirmed.date}
                          </p>
                          <p className="text-sm text-success-700 flex items-center gap-1">
                            <FiClock size={14} />
                            {formattedDates.confirmed.time}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ) : formattedDates.proposed.length > 0 ? (
                  <div className="space-y-3">
                    {formattedDates.proposed.map((proposedDate, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 rounded border border-default-200 bg-default-50"
                      >
                        <p className="text-sm text-default-700">
                          {proposedDate.date}
                        </p>
                        <p className="text-sm text-default-700 flex items-center gap-1">
                          {proposedDate.time}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-default-50 border border-default-200">
                    <CardBody className="py-4 text-center">
                      <p className="text-default-500">No dates proposed yet</p>
                    </CardBody>
                  </Card>
                )}
              </div>

              {event.location && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiMapPin className="text-default-500" size={18} />
                    <h4 className="text-sm font-semibold text-default-700">
                      Location
                    </h4>
                  </div>
                  <p className="text-sm text-default-600">{event.location}</p>
                </div>
              )}

              {hasRejectionReason && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiAlertCircle className="text-danger-500" size={18} />
                    <h4 className="text-sm font-semibold text-danger-700">
                      Rejection Reason
                    </h4>
                  </div>
                  <Card className="bg-danger-50 border border-danger-200 shadow-sm">
                    <CardBody className="py-4">
                      <p className="text-danger-800">{event.rejectionReason}</p>
                    </CardBody>
                  </Card>
                </div>
              )}
            </ModalBody>

            <ModalFooter className="py-4 border-t border-default-200">
              <div className="flex items-center justify-end gap-3 w-full">
                {canCancel && (
                  <Button
                    color="danger"
                    size="lg"
                    variant="flat"
                    onPress={() => setShowConfirmCancel(true)}
                  >
                    Cancel Event
                  </Button>
                )}
                {isAwaitingAction && (
                  <Button color="primary" size="lg">
                    {viewMode === "hr" ? "Review Event" : "Respond"}
                  </Button>
                )}
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
