import { Button } from "@heroui/react";
import { FiPlus } from "react-icons/fi";

import useHR from "./useHR";

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
        <FilterTabs
          selectedKey={statusFilter}
          tabs={tabs}
          onSelectionChange={handleStatusChange}
        />

        <EventTable
          events={events}
          isLoading={isTransitioning}
          userRole="HR"
          onViewDetails={handleViewEvent}
        />
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
