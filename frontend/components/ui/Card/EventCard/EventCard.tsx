import { FC } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
  Chip,
} from "@heroui/react";
import { FiCalendar, FiMapPin, FiClock, FiEye } from "react-icons/fi";

import { useEventCard } from "./useEventCard";

import { IEvent } from "@/types";
import { Role } from "@/utils/labels";

export interface EventCardProps {
  event: IEvent;
  onViewDetails: (event: IEvent) => void;
  userRole: Role;
}

export const EventCard: FC<EventCardProps> = ({
  event,
  onViewDetails,
  userRole,
}) => {
  const {
    categoryLabel,
    statusColor,
    statusLabel,
    isGrayscale,
    formattedDate,
    formattedTime,
    categoryImage,
    additionalDatesCount,
  } = useEventCard(event, userRole);

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 relative overflow-visible">
        <Image
          removeWrapper
          alt={event.title}
          className={`w-full h-[200px] object-cover rounded-b-none ${
            isGrayscale ? "grayscale" : ""
          }`}
          src={categoryImage}
        />
        <div className="absolute top-3 right-3 z-10">
          <Chip
            className="text-default-800"
            color={statusColor}
            size="sm"
            variant="shadow"
          >
            {statusLabel}
          </Chip>
        </div>
      </CardHeader>

      <CardBody className="px-4 py-3 space-y-2">
        <div className="flex items-center gap-2">
          <Chip size="sm" variant="flat">
            {categoryLabel}
          </Chip>
        </div>
        <h3 className="text-lg font-bold text-default-900 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-sm font-medium text-primary line-clamp-1">
          {event.companyInfo?.companyName || "N/A"}
        </p>

        <p className="text-sm text-default-600 line-clamp-2">
          {event.description}
        </p>

        {formattedDate ? (
          <div className="flex items-center gap-1 text-sm text-default-500">
            <FiCalendar size={14} />
            <span>{formattedDate}</span>
            {formattedTime && (
              <>
                <FiClock className="ml-2" size={14} />
                <span>{formattedTime}</span>
              </>
            )}
            {additionalDatesCount > 0 && (
              <Chip
                className="ml-1"
                color="default"
                size="sm"
                variant="bordered"
              >
                +{additionalDatesCount}
              </Chip>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 text-sm text-default-400 italic">
            <FiCalendar size={14} />
            <span>No proposed date</span>
          </div>
        )}

        {event.location && (
          <div className="flex items-center gap-1 text-xs text-default-600">
            <FiMapPin size={13} />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}
      </CardBody>

      <CardFooter className="px-4 py-3 pt-0">
        <Button
          color="primary"
          size="sm"
          startContent={<FiEye size={16} />}
          onPress={() => onViewDetails(event)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
