import { Button } from "@heroui/react";
import { FiCheck, FiX, FiCalendar } from "react-icons/fi";

interface EventDetailFooterProps {
  canCancel: boolean;
  showVendorPendingActions: boolean;
  showVendorProposalActions: boolean;
  showHrApprovalActions: boolean;
  onCancelEvent: () => void;
  onOpenApprove?: () => void;
  onOpenReject?: () => void;
  onOpenPropose?: () => void;
}

export function EventDetailFooter({
  canCancel,
  showVendorPendingActions,
  showVendorProposalActions,
  showHrApprovalActions,
  onCancelEvent,
  onOpenApprove,
  onOpenReject,
  onOpenPropose,
}: EventDetailFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3 w-full">
      {canCancel && (
        <Button color="danger" size="lg" variant="flat" onPress={onCancelEvent}>
          Cancel Event
        </Button>
      )}

      {showVendorPendingActions && (
        <>
          <Button
            color="success"
            size="lg"
            startContent={<FiCheck size={18} />}
            onPress={onOpenApprove}
          >
            Accept
          </Button>
          <Button
            color="danger"
            size="lg"
            startContent={<FiX size={18} />}
            variant="flat"
            onPress={onOpenReject}
          >
            Reject
          </Button>
          <Button
            color="primary"
            size="lg"
            startContent={<FiCalendar size={18} />}
            onPress={onOpenPropose}
          >
            Propose New Dates
          </Button>
        </>
      )}

      {showVendorProposalActions && (
        <>
          <Button
            color="primary"
            size="lg"
            startContent={<FiCalendar size={18} />}
            onPress={onOpenPropose}
          >
            Propose New Dates
          </Button>
          <Button
            color="danger"
            size="lg"
            startContent={<FiX size={18} />}
            variant="flat"
            onPress={onOpenReject}
          >
            Reject
          </Button>
        </>
      )}

      {showHrApprovalActions && (
        <>
          <Button
            color="success"
            size="lg"
            startContent={<FiCheck size={18} />}
            onPress={onOpenApprove}
          >
            Approve
          </Button>
          <Button
            color="danger"
            size="lg"
            startContent={<FiX size={18} />}
            variant="flat"
            onPress={onOpenReject}
          >
            Reject
          </Button>
        </>
      )}
    </div>
  );
}
