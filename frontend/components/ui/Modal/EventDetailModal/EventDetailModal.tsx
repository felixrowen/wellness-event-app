import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
} from "@heroui/react";
import { FiMapPin, FiUsers, FiCalendar } from "react-icons/fi";

import { EventRequest } from "@/data/mockEvents";

interface EventDetailModalProps {
  event: EventRequest | null;
  isOpen: boolean;
  onClose: () => void;
  viewMode?: "hr" | "vendor";
}

export function EventDetailModal({
  event,
  isOpen,
  onClose,
  viewMode: _viewMode = "hr",
}: EventDetailModalProps) {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-SG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleTimeString("en-SG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (
    status: string,
  ): "warning" | "success" | "danger" | "default" => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{event.eventName}</h3>
                  <p className="text-sm text-default-500 mt-1">
                    {event.category}
                  </p>
                </div>
                <Chip
                  color={getStatusColor(event.status)}
                  size="sm"
                  variant="flat"
                >
                  {event.status}
                </Chip>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-2">
                    Vendor Information
                  </h4>
                  <p className="text-default-700">{event.vendorName}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <FiCalendar size={16} />
                    {event.confirmedDate ? "Confirmed Date" : "Proposed Dates"}
                  </h4>
                  {event.confirmedDate ? (
                    <div className="bg-success/10 p-3 rounded-lg">
                      <p className="font-medium text-success">
                        {formatDate(event.confirmedDate)}
                      </p>
                      <p className="text-sm text-default-500">
                        {formatTime(event.confirmedDate)}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {event.proposedDates.map((date, index) => (
                        <div
                          key={index}
                          className="border border-default-200 p-3 rounded-lg"
                        >
                          <p className="font-medium">
                            Option {index + 1}: {formatDate(date)}
                          </p>
                          <p className="text-sm text-default-500">
                            {formatTime(date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <FiMapPin size={16} />
                    Location
                  </h4>
                  <p className="text-default-700">{event.proposedLocation}</p>
                </div>

                {event.status === "REJECTED" && event.remarks && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">
                      Rejection Reason
                    </h4>
                    <div className="bg-danger/10 p-3 rounded-lg">
                      <p className="text-default-700">{event.remarks}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold mb-2">Created</h4>
                  <p className="text-default-500 text-sm">
                    {formatDate(event.dateCreated)}
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
