import { useState } from "react";
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
} from "@heroui/react";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: CreateEventData) => void;
}

export interface CreateEventData {
  eventName: string;
  category: string;
  vendorName: string;
  proposedDate1: string;
  proposedDate2: string;
  proposedDate3: string;
  proposedLocation: string;
  capacity: number;
}

const eventCategories = [
  "Yoga Class",
  "Meditation Session",
  "Fitness Workshop",
  "Mental Health Workshop",
  "Team Building",
  "Nutrition Seminar",
  "Health Screening",
  "Other",
];

export function CreateEventModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateEventModalProps) {
  const [formData, setFormData] = useState<CreateEventData>({
    eventName: "",
    category: "",
    vendorName: "",
    proposedDate1: "",
    proposedDate2: "",
    proposedDate3: "",
    proposedLocation: "",
    capacity: 0,
  });

  const handleSubmit = () => {
    if (
      !formData.eventName ||
      !formData.category ||
      !formData.vendorName ||
      !formData.proposedDate1 ||
      !formData.proposedDate2 ||
      !formData.proposedDate3 ||
      !formData.proposedLocation ||
      formData.capacity <= 0
    ) {
      alert("Please fill in all fields");

      return;
    }

    onSubmit(formData);

    setFormData({
      eventName: "",
      category: "",
      vendorName: "",
      proposedDate1: "",
      proposedDate2: "",
      proposedDate3: "",
      proposedLocation: "",
      capacity: 0,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h3 className="text-xl font-bold">Create New Event</h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  isRequired
                  label="Event Name"
                  placeholder="Enter event name"
                  value={formData.eventName}
                  onChange={(e) =>
                    setFormData({ ...formData, eventName: e.target.value })
                  }
                />

                <Select
                  isRequired
                  label="Category"
                  placeholder="Select event category"
                  selectedKeys={formData.category ? [formData.category] : []}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {eventCategories.map((category) => (
                    <SelectItem key={category}>{category}</SelectItem>
                  ))}
                </Select>

                <Input
                  isRequired
                  label="Vendor Name"
                  placeholder="Enter vendor name"
                  value={formData.vendorName}
                  onChange={(e) =>
                    setFormData({ ...formData, vendorName: e.target.value })
                  }
                />

                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Proposed Dates (3 options)
                  </p>
                </div>

                <Input
                  isRequired
                  label="Proposed Location"
                  placeholder="Enter location"
                  value={formData.proposedLocation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proposedLocation: e.target.value,
                    })
                  }
                />

                <Input
                  isRequired
                  label="Capacity"
                  min="1"
                  placeholder="Enter capacity"
                  type="number"
                  value={formData.capacity.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Create Event
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
