import { Button, ButtonGroup, Skeleton, Card } from "@heroui/react";
import { FiPlus, FiGrid, FiList } from "react-icons/fi";

import useHR from "./useHR";

import { EventCard } from "@/components/ui/Card/EventCard";
import { EventDetailModal } from "@/components/ui/Modal/HR/EventDetailModal";
import { CreateEventModal } from "@/components/ui/Modal/HR/CreateEventModal";
import { ApproveVendorDatesModal } from "@/components/ui/Modal/HR/ApproveVendorDatesModal";
import { RejectEventModal } from "@/components/ui/Modal/Vendor/RejectEventModal";
import FilterTabs from "@/components/ui/FilterTabs";
import EventTable from "@/components/ui/Table/EventTable";

const HRDashboard = () => {
  const {
    events,
    selectedEvent,
    isModalOpen,
    isCreateModalOpen,
    isApproveModalOpen,
    isRejectModalOpen,
    setIsCreateModalOpen,
    handleViewEvent,
    handleCloseModal,
    handleOpenApprove,
    handleOpenReject,
    handleCloseApproveModal,
    handleCloseRejectModal,
    handleCreateEvent,
    handleDeleteEvent,
    handleApproveVendorDates,
    handleRejectVendorDates,
    tabs,
    statusFilter,
    handleStatusChange,
    handleViewModeChange,
    viewMode,
    isTransitioning,
    isCreatingEvent,
    isDeletingEvent,
    isApprovingDates,
    isRejectingDates,
    vendorsData,
    isLoadingVendors,
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

      <div className="space-y-4">
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
                  userRole="HR"
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
            userRole="HR"
            onViewDetails={handleViewEvent}
          />
        )}
      </div>

      <EventDetailModal
        event={selectedEvent}
        isCancelling={isDeletingEvent}
        isOpen={isModalOpen}
        viewMode="hr"
        onCancelEvent={handleDeleteEvent}
        onClose={handleCloseModal}
        onOpenApprove={handleOpenApprove}
        onOpenReject={handleOpenReject}
      />

      <ApproveVendorDatesModal
        event={selectedEvent}
        isLoading={isApprovingDates}
        isOpen={isApproveModalOpen}
        onApprove={handleApproveVendorDates}
        onClose={handleCloseApproveModal}
      />

      <RejectEventModal
        event={selectedEvent}
        isLoading={isRejectingDates}
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        onReject={handleRejectVendorDates}
      />

      <CreateEventModal
        isLoading={isCreatingEvent}
        isLoadingVendors={isLoadingVendors}
        isOpen={isCreateModalOpen}
        vendorsData={vendorsData}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
};

export default HRDashboard;
