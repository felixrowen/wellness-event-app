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
import { FiMapPin } from "react-icons/fi";

import { Role, getStatusLabel, getStatusColor } from "@/utils/labels";
import { getCategoryImage } from "@/utils/category";
import { EVENT_CATEGORY_LABELS, EVENT_CATEGORY, IEvent } from "@/types";

export interface EventTableProps {
  events: IEvent[];
  onViewDetails?: (event: IEvent) => void;
  isLoading?: boolean;
  userRole?: Role;
}

const getCategoryLabel = (category: number): string => {
  return EVENT_CATEGORY_LABELS[category as EVENT_CATEGORY];
};

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
        <TableColumn>VENDOR</TableColumn>
        <TableColumn>LOCATION</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={
          <div className="text-center py-8">
            <p className="text-default-500">No events found</p>
          </div>
        }
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
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
                  <Skeleton className="w-24 h-4 rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-32 h-4 rounded-lg" />
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
              <TableRow key={event._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      alt={event.title}
                      className={`w-16 h-16 rounded-lg object-cover ${
                        event.status === "REJECTED" ? "grayscale" : ""
                      }`}
                      src={getCategoryImage(event.category)}
                    />
                    <div>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm text-default-500">
                        {getCategoryLabel(event.category)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{event.companyInfo.companyName}</p>
                </TableCell>
                <TableCell>
                  <p className="text-sm">
                    {typeof event.assignedVendorId === "object" &&
                    event.assignedVendorId?.vendorName
                      ? event.assignedVendorId.vendorName
                      : "N/A"}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FiMapPin size={14} />
                    <span className="text-sm">{event.location || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    color={getStatusColor(event.status)}
                    size="sm"
                    variant="flat"
                  >
                    {getStatusLabel(userRole, event.status)}
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
