import { Button, ButtonGroup, Skeleton, Card } from "@heroui/react";
import { FiGrid, FiList } from "react-icons/fi";

import useVendor from "./useVendor";

import { EventCard } from "@/components/ui/Card/EventCard";
import { EventDetailModal } from "@/components/ui/Modal/HR/EventDetailModal";
import { ApproveEventModal } from "@/components/ui/Modal/Vendor/ApproveEventModal";
import { RejectEventModal } from "@/components/ui/Modal/Vendor/RejectEventModal";
import { ProposeNewDatesModal } from "@/components/ui/Modal/Vendor/ProposeNewDatesModal";
import FilterTabs from "@/components/ui/FilterTabs";
import EventTable from "@/components/ui/Table/EventTable";

const VendorDashboard = () => {
  const {
    events,
    selectedEvent,
    isModalOpen,
    isApproveModalOpen,
    isRejectModalOpen,
    isProposeModalOpen,
    handleViewEvent,
    handleCloseModal,
    handleOpenApprove,
    handleOpenReject,
    handleOpenPropose,
    handleCloseApproveModal,
    handleCloseRejectModal,
    handleCloseProposeModal,
    handleApproveEvent,
    handleRejectEvent,
    handleProposeNewDates,
    isApprovingEvent,
    isRejectingEvent,
    isProposingDates,
    tabs,
    statusFilter,
    handleStatusChange,
    handleViewModeChange,
    viewMode,
    isTransitioning,
  } = useVendor();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-default-900">My Events</h3>
          <div className="flex items-center justify-between gap-4">
            <FilterTabs
              selectedKey={statusFilter}
              tabs={tabs}
              onSelectionChange={handleStatusChange}
            />
            <ButtonGroup size="sm" variant="flat">
              <Button
                isIconOnly
                color={viewMode === "card" ? "primary" : "default"}
                onPress={() => handleViewModeChange("card")}
              >
                <FiGrid size={18} />
              </Button>
              <Button
                isIconOnly
                color={viewMode === "list" ? "primary" : "default"}
                onPress={() => handleViewModeChange("list")}
              >
                <FiList size={18} />
              </Button>
            </ButtonGroup>
          </div>
        </div>

        {viewMode === "card" ? (
          isTransitioning ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="w-full space-y-5 p-4" radius="lg">
                  <Skeleton className="rounded-lg">
                    <div className="h-48 rounded-lg bg-default-300" />
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                    </Skeleton>
                  </div>
                </Card>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onViewDetails={handleViewEvent}
                />
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-default-500 text-center">No events found</p>
              </div>
            </Card>
          )
        ) : (
          <EventTable
            events={events}
            isLoading={isTransitioning}
            userRole="VENDOR"
            onViewDetails={handleViewEvent}
          />
        )}
      </div>

      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        viewMode="vendor"
        onClose={handleCloseModal}
        onOpenApprove={handleOpenApprove}
        onOpenPropose={handleOpenPropose}
        onOpenReject={handleOpenReject}
      />

      <ApproveEventModal
        event={selectedEvent}
        isLoading={isApprovingEvent}
        isOpen={isApproveModalOpen}
        onApprove={handleApproveEvent}
        onClose={handleCloseApproveModal}
      />

      <RejectEventModal
        event={selectedEvent}
        isLoading={isRejectingEvent}
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        onReject={handleRejectEvent}
      />

      <ProposeNewDatesModal
        event={selectedEvent}
        isLoading={isProposingDates}
        isOpen={isProposeModalOpen}
        onClose={handleCloseProposeModal}
        onPropose={handleProposeNewDates}
      />
    </div>
  );
};

export default VendorDashboard;
