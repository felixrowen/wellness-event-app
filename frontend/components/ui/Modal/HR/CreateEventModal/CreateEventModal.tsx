import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
} from "@heroui/react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import {
  parseDateTime,
  today,
  getLocalTimeZone,
} from "@internationalized/date";
import { Controller } from "react-hook-form";

import { useCreateEventModal } from "./useCreateEventModal";

import { EVENT_CATEGORY_LABELS, ICreateEventDTO, IVendor } from "@/types";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: ICreateEventDTO) => void;
  isLoading?: boolean;
  vendorsData?: IVendor[];
  isLoadingVendors?: boolean;
}

export function CreateEventModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  vendorsData,
  isLoadingVendors = false,
}: CreateEventModalProps) {
  const {
    control,
    handleSubmit,
    errors,
    proposedDates,
    handleAddProposedDate,
    handleRemoveProposedDate,
    handleProposedDateChange,
    onSubmitForm,
  } = useCreateEventModal({ onSubmit });

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h3 className="text-xl font-bold">Create New Event</h3>
            </ModalHeader>
            <ModalBody>
              <form
                className="space-y-4"
                id="create-event-form"
                onSubmit={handleSubmit(onSubmitForm)}
              >
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <Input
                      {...field}
                      isRequired
                      errorMessage={errors.title?.message}
                      isInvalid={!!errors.title}
                      label="Event Title"
                      placeholder="Enter event title"
                      variant="bordered"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      isRequired
                      errorMessage={errors.description?.message}
                      isInvalid={!!errors.description}
                      label="Description"
                      placeholder="Enter event description"
                      variant="bordered"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isRequired
                      errorMessage={errors.category?.message}
                      isInvalid={!!errors.category}
                      label="Category"
                      placeholder="Select event category"
                      selectedKeys={field.value ? [field.value.toString()] : []}
                      variant="bordered"
                      onChange={(e) => {
                        const value = parseInt(e.target.value);

                        if (!isNaN(value)) {
                          field.onChange(value);
                        }
                      }}
                    >
                      {Object.entries(EVENT_CATEGORY_LABELS).map(
                        ([key, label]) => (
                          <SelectItem key={key}>{label}</SelectItem>
                        ),
                      )}
                    </Select>
                  )}
                />

                <Controller
                  control={control}
                  name="assignedVendorId"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isRequired
                      errorMessage={errors.assignedVendorId?.message}
                      isInvalid={!!errors.assignedVendorId}
                      isLoading={isLoadingVendors}
                      label="Assign Vendor"
                      placeholder="Select vendor"
                      selectedKeys={field.value ? [field.value] : []}
                      variant="bordered"
                    >
                      {vendorsData?.map((vendor) => (
                        <SelectItem key={vendor._id}>
                          {vendor.vendorName || vendor.fullName}
                        </SelectItem>
                      )) || []}
                    </Select>
                  )}
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      Proposed Dates (Optional, max 3)
                    </p>
                    {(proposedDates?.length || 0) < 3 && (
                      <Button
                        isIconOnly
                        color="primary"
                        size="sm"
                        type="button"
                        variant="flat"
                        onPress={handleAddProposedDate}
                      >
                        <FiPlus size={18} />
                      </Button>
                    )}
                  </div>

                  {proposedDates?.map((date, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <DatePicker
                        className="flex-1 bg-transparent"
                        granularity="second"
                        label={`Date Option ${index + 1}`}
                        minValue={today(getLocalTimeZone())}
                        popoverProps={{
                          placement: "top",
                        }}
                        value={date ? parseDateTime(date) : null}
                        variant="bordered"
                        onChange={(value) => {
                          if (value) {
                            const isoDate = `${value.year}-${String(value.month).padStart(2, "0")}-${String(value.day).padStart(2, "0")}T${String(value.hour).padStart(2, "0")}:${String(value.minute).padStart(2, "0")}:${String(value.second).padStart(2, "0")}`;

                            handleProposedDateChange(index, isoDate);
                          } else {
                            handleProposedDateChange(index, "");
                          }
                        }}
                      />
                      <Button
                        isIconOnly
                        size="lg"
                        type="button"
                        variant="flat"
                        onPress={() => handleRemoveProposedDate(index)}
                      >
                        <FiTrash2 size={16} />
                      </Button>
                    </div>
                  ))}

                  {proposedDates?.length === 0 && (
                    <p className="text-sm text-default-400 italic">
                      No proposed dates added. Click the + button to add dates.
                    </p>
                  )}
                </div>

                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <Input
                      {...field}
                      isRequired
                      label="Location"
                      placeholder="Enter location"
                      variant="bordered"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Duration"
                      placeholder="e.g., 2 hours, 1 day"
                      variant="bordered"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="audience"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Audience Size"
                      placeholder="e.g., 50-100, 200-300"
                      variant="bordered"
                    />
                  )}
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                form="create-event-form"
                isLoading={isLoading}
                type="submit"
              >
                Create Event
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
