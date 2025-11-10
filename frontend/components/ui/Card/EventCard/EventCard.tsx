import { FC, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  RadioGroup,
  Radio,
  Chip,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { FiCalendar, FiMapPin, FiCheck, FiX, FiClock } from "react-icons/fi";

import { EventRequest } from "@/data/mockEvents";

export interface EventCardProps {
  event: EventRequest;
  onApprove: (eventId: string, selectedDate: string) => void;
  onReject: (eventId: string) => void;
}

export const EventCard: FC<EventCardProps> = ({
  event,
  onApprove,
  onReject,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleApprove = () => {
    if (!selectedDate) {
      alert("Please select a date before approving");

      return;
    }

    onApprove(event.id, selectedDate);
    onClose();
  };

  const handleReject = () => {
    onReject(event.id);
    onClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-SG", {
      day: "numeric",
      month: "short",
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

  return (
    <>
      <Card className="w-full max-w-[400px] hover:shadow-lg transition-shadow">
        <CardHeader className="p-0 relative">
          <Image
            removeWrapper
            alt={event.eventName}
            className="w-full h-[200px] object-cover rounded-b-none"
            src={
              event.imageUrl ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop"
            }
          />

          <Chip
            className="absolute top-3 left-3"
            color="secondary"
            size="sm"
            variant="solid"
          >
            {event.category || "Event"}
          </Chip>

          <Chip
            className="absolute top-3 right-3"
            color={
              event.status === "PENDING"
                ? "warning"
                : event.status === "APPROVED"
                  ? "success"
                  : "danger"
            }
            size="sm"
            variant="flat"
          >
            {event.status}
          </Chip>
        </CardHeader>

        <CardBody className="px-4 py-3 space-y-3">
          <div className="flex items-center gap-2 text-sm text-default-500">
            <FiCalendar size={16} />
            <span>{formatDate(event.proposedDates[0])}</span>
            <FiClock size={16} />
            <span>{formatTime(event.dateCreated)}</span>
          </div>

          <h3 className="text-lg font-bold text-default-900 line-clamp-1">
            {event.eventName}
          </h3>

          <div className="flex items-center gap-2 text-sm text-default-600">
            <FiMapPin size={16} />
            <span className="line-clamp-1">{event.proposedLocation}</span>
          </div>
        </CardBody>

        <CardFooter className="px-4 py-3 pt-0 flex justify-between items-center">
          <Button color="primary" size="sm" onPress={onOpen}>
            View Details
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{event.eventName}</h2>
            <p className="text-sm text-default-500 font-normal">
              {event.companyName}
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              {event.imageUrl && (
                <Image
                  removeWrapper
                  alt={event.eventName}
                  className="w-full h-[200px] object-cover rounded-lg"
                  src={event.imageUrl}
                />
              )}

              <div className="flex items-start gap-2">
                <FiMapPin className="mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold text-default-700">
                    Proposed Location
                  </p>
                  <p className="text-default-600">{event.proposedLocation}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FiCalendar size={18} />
                  <span className="font-semibold text-default-700">
                    Select Proposed Date
                  </span>
                </div>
                <RadioGroup
                  value={selectedDate}
                  onValueChange={setSelectedDate}
                >
                  {event.proposedDates.map((date) => (
                    <Radio key={date} value={date}>
                      {formatDate(date)}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              startContent={<FiX size={18} />}
              variant="flat"
              onPress={handleReject}
            >
              Reject
            </Button>
            <Button
              color="success"
              startContent={<FiCheck size={18} />}
              onPress={handleApprove}
            >
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
