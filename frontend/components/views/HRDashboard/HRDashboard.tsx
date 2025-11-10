import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import { FiEye, FiPlus } from "react-icons/fi";

import useHR from "./useHR";

import { EventDetailModal } from "@/components/ui/Modal/EventDetailModal";
import { CreateEventModal } from "@/components/ui/Modal/CreateEventModal";
import { formatDate, getStatusColor } from "@/utils/helpers";

const HRDashboard = () => {
  const {
    events,
    selectedEvent,
    isModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    handleViewEvent,
    handleCloseModal,
    handleCreateEvent,
    pendingCount,
    approvedCount,
    rejectedCount,
  } = useHR();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-default-900">
            Event Requests
          </h2>
          <p className="text-default-500 mt-1">
            Manage your company&apos;s wellness events
          </p>
        </div>
        <Button
          color="primary"
          startContent={<FiPlus size={20} />}
          onPress={() => setIsCreateModalOpen(true)}
        >
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Total Events</p>
            <p className="text-3xl font-bold mt-1">{events.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Pending</p>
            <p className="text-3xl font-bold mt-1 text-warning">
              {pendingCount}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Approved</p>
            <p className="text-3xl font-bold mt-1 text-success">
              {approvedCount}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Rejected</p>
            <p className="text-3xl font-bold mt-1 text-danger">
              {rejectedCount}
            </p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">All Events</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Events table">
            <TableHeader>
              <TableColumn>EVENT NAME</TableColumn>
              <TableColumn>VENDOR NAME</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATE CREATED</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{event.eventName}</p>
                      <p className="text-sm text-default-500">
                        {event.category}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{event.vendorName}</TableCell>
                  <TableCell>
                    <div>
                      {event.confirmedDate ? (
                        <p className="font-medium">
                          {formatDate(event.confirmedDate)}
                        </p>
                      ) : (
                        <div className="text-sm">
                          {event.proposedDates.slice(0, 2).map((date, idx) => (
                            <p key={idx}>{formatDate(date)}</p>
                          ))}
                          {event.proposedDates.length > 2 && (
                            <p className="text-default-400">
                              +{event.proposedDates.length - 2} more
                            </p>
                          )}
                        </div>
                      )}
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
                  <TableCell>{formatDate(event.dateCreated)}</TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => handleViewEvent(event)}
                    >
                      <FiEye size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        viewMode="hr"
        onClose={handleCloseModal}
      />

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
};

export default HRDashboard;
