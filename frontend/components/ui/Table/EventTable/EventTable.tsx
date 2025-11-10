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
  Skeleton,
} from "@heroui/react";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

import { EventRequest } from "@/data/mockEvents";
import { Role, getStatusLabel, getStatusColor } from "@/utils/statusLabels";
import { formatDate, formatTime } from "@/utils/helpers";

export interface EventTableProps {
  events: EventRequest[];
  onViewDetails?: (event: EventRequest) => void;
  isLoading?: boolean;
  userRole?: Role;
}

const EventTable: FC<EventTableProps> = ({
  events,
  onViewDetails,
  isLoading = false,
  userRole = "VENDOR",
}) => {
  return (
    <Table aria-label="Events table">
      <TableHeader>
        <TableColumn>EVENT</TableColumn>
        <TableColumn>COMPANY</TableColumn>
        <TableColumn>LOCATION</TableColumn>
        <TableColumn>DATE & TIME</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-16 h-16 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="w-32 h-4 rounded-lg" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-4 rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-32 h-4 rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-28 h-4 rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-20 h-6 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-8 rounded-lg" />
                </TableCell>
              </TableRow>
            ))
          : events.map((event) => (
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
                      <p className="text-sm text-default-500">
                        {event.category}
                      </p>
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
                  <div className="flex items-center gap-2">
                    <FiClock size={14} />
                    <span className="text-sm">
                      {formatTime(event.dateCreated)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    color={getStatusColor(userRole, event.status)}
                    size="sm"
                    variant="flat"
                  >
                    {getStatusLabel(userRole, event.status).text}
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
