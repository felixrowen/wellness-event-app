import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  Card,
  CardBody,
} from "@heroui/react";
import {
  FiMapPin,
  FiClock,
  FiUser,
  FiAlertCircle,
  FiInfo,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { useState } from "react";

import { useEventDetailModal } from "./useEventDetailModal";
import { EventDetailDelete } from "./EventDetailDelete";
import { EventDetailFooter } from "./EventDetailFooter";
import { EventDetailDate } from "./EventDetailDate";

import { IEvent } from "@/types";

interface EventDetailModalProps {
  event: IEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onCancelEvent?: (eventId: string) => void;
  isCancelling?: boolean;
  viewMode?: "hr" | "vendor";
  onOpenApprove?: () => void;
  onOpenReject?: () => void;
  onOpenPropose?: () => void;
}

export function EventDetailModal({
  event,
  isOpen,
  onClose,
  onCancelEvent,
  isCancelling = false,
  viewMode = "hr",
  onOpenApprove,
  onOpenReject,
  onOpenPropose,
}: EventDetailModalProps) {
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const {
    statusInfo,
    categoryLabel,
    formattedDates,
    formattedCreatedDate,
    hasRejectionReason,
    canCancel,
    showVendorPendingActions,
    showVendorProposalActions,
    showHrApprovalActions,
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

  if (showConfirmCancel) {
    return (
      <EventDetailDelete
        isCancelling={isCancelling}
        isOpen={isOpen}
        onClose={() => setShowConfirmCancel(false)}
        onConfirm={handleCancelClick}
      />
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

            <ModalBody className="py-6 space-y-3">
              {viewMode === "vendor" ? null : (
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
              )}

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

              <EventDetailDate formattedDates={formattedDates} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiClock className="text-default-500" size={18} />
                    <h4 className="text-sm font-semibold text-default-700">
                      Duration
                    </h4>
                  </div>
                  <p className="text-sm text-default-600">
                    {event.duration || "-"}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiUser className="text-default-500" size={18} />
                    <h4 className="text-sm font-semibold text-default-700">
                      Audience Size
                    </h4>
                  </div>
                  <p className="text-sm text-default-600">
                    {event.audience || "-"}
                  </p>
                </div>
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
              <EventDetailFooter
                canCancel={canCancel}
                showHrApprovalActions={showHrApprovalActions}
                showVendorPendingActions={showVendorPendingActions}
                showVendorProposalActions={showVendorProposalActions}
                onCancelEvent={() => setShowConfirmCancel(true)}
                onOpenApprove={onOpenApprove}
                onOpenPropose={onOpenPropose}
                onOpenReject={onOpenReject}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
