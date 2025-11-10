import { FC } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@heroui/react";
import { FiCalendar, FiMapPin } from "react-icons/fi";

import { EventRequest } from "@/data/mockEvents";

export interface EventTableProps {
  events: EventRequest[];
  onViewDetails?: (event: EventRequest) => void;
}

const EventTable: FC<EventTableProps> = ({ events, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-SG", {
      day: "numeric",
      month: "short",
      year: "numeric",
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
    <Table aria-label="Events table">
      <TableHeader>
        <TableColumn>EVENT</TableColumn>
        <TableColumn>COMPANY</TableColumn>
        <TableColumn>LOCATION</TableColumn>
        <TableColumn>DATE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <img
                  alt={event.eventName}
                  className={`w-16 h-16 rounded-lg object-cover ${
                    event.status === "REJECTED" ? "grayscale" : ""
                  }`}
                  src={
                    event.imageUrl ||
                    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop"
                  }
                />
                <div>
                  <p className="font-semibold">{event.eventName}</p>
                  <p className="text-sm text-default-500">{event.category}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="font-medium">{event.companyName}</p>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <FiMapPin size={14} />
                <span className="text-sm">{event.proposedLocation}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <FiCalendar size={14} />
                <span className="text-sm">
                  {formatDate(event.proposedDates[0])}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Chip
                color={getStatusColor(event.status)}
                size="sm"
                variant="flat"
              >
                {event.status}
              </Chip>
            </TableCell>
            <TableCell>
              <Button
                color="primary"
                size="sm"
                variant="flat"
                onPress={() => onViewDetails?.(event)}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EventTable;
