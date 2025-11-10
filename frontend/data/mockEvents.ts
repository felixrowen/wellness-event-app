export interface EventRequest {
  id: string;
  eventName: string;
  companyName: string;
  vendorName: string;
  proposedDates: string[];
  proposedLocation: string;
  confirmedDate: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  remarks: string;
  dateCreated: string;
  category?: string;
  imageUrl?: string;
  price?: number;
  capacity?: number;
  registered?: number;
}

export const mockEventRequests: EventRequest[] = [
  {
    id: "1",
    eventName: "Healthy Mind, Healthy Body",
    companyName: "TechCorp Ltd",
    vendorName: "WellCare Services",
    proposedDates: ["2025-11-20", "2025-11-22", "2025-11-25"],
    proposedLocation: "Marina Bay, Singapore",
    confirmedDate: null,
    status: "PENDING",
    remarks: "",
    dateCreated: "2025-11-10T14:00:00Z",
    category: "Health & Wellness",
    imageUrl:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    eventName: "Corporate Wellness Workshop",
    companyName: "Global Innovations Inc",
    vendorName: "WellCare Services",
    proposedDates: ["2025-11-18", "2025-11-19", "2025-11-21"],
    proposedLocation: "Raffles Place, Singapore",
    confirmedDate: "2025-11-19",
    status: "APPROVED",
    remarks: "",
    dateCreated: "2025-11-09T10:30:00Z",
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    eventName: "Mental Health Awareness Session",
    companyName: "StartUp Hub",
    vendorName: "WellCare Services",
    proposedDates: ["2025-11-23", "2025-11-24", "2025-11-26"],
    proposedLocation: "Orchard Road, Singapore",
    confirmedDate: null,
    status: "PENDING",
    remarks: "",
    dateCreated: "2025-11-08T16:45:00Z",
    category: "Fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    eventName: "Nutrition & Diet Planning",
    companyName: "Finance Corp",
    vendorName: "WellCare Services",
    proposedDates: ["2025-11-27", "2025-11-28", "2025-11-29"],
    proposedLocation: "Sentosa Island, Singapore",
    confirmedDate: null,
    status: "REJECTED",
    remarks: "Unable to accommodate the proposed dates",
    dateCreated: "2025-11-07T09:15:00Z",
    category: "Outdoor & Adventure",
    imageUrl:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    eventName: "Art & Design Expo",
    companyName: "Creative Studios",
    vendorName: "WellCare Services",
    proposedDates: ["2025-11-15", "2025-11-16", "2025-11-17"],
    proposedLocation: "Museum Gallery, San Francisco, CA",
    confirmedDate: "2025-11-16",
    status: "APPROVED",
    remarks: "",
    dateCreated: "2025-11-06T10:00:00Z",
    category: "Art & Design",
    imageUrl:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    eventName: "Culinary Delights Festival",
    companyName: "Food Network",
    vendorName: "WellCare Services",
    proposedDates: ["2025-11-25", "2025-11-26", "2025-11-27"],
    proposedLocation: "Gourmet Plaza, San Francisco, CA",
    confirmedDate: null,
    status: "PENDING",
    remarks: "",
    dateCreated: "2025-11-05T11:00:00Z",
    category: "Food & Culinary",
    imageUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop",
  },
  {
    id: "7",
    eventName: "Tech Future Festival",
    companyName: "Silicon Valley Tech",
    vendorName: "WellCare Services",
    proposedDates: ["2025-06-01", "2025-06-02", "2025-06-03"],
    proposedLocation: "Silicon Valley, San Jose, CA",
    confirmedDate: null,
    status: "PENDING",
    remarks: "",
    dateCreated: "2025-11-04T10:00:00Z",
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
  },
  {
    id: "8",
    eventName: "Global Beats Festival",
    companyName: "Music Productions",
    vendorName: "WellCare Services",
    proposedDates: ["2025-11-20", "2025-11-21", "2025-11-22"],
    proposedLocation: "Sunset Park, Los Angeles, CA",
    confirmedDate: null,
    status: "PENDING",
    remarks: "",
    dateCreated: "2025-11-03T08:00:00Z",
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop",
  },
];

// Mock data for HR Admin (filtered by company)
export const getEventsByCompany = (companyName: string): EventRequest[] => {
  return mockEventRequests.filter((event) => event.companyName === companyName);
};

// Mock data for Vendor Admin (filtered by vendor)
export const getEventsByVendor = (vendorName: string): EventRequest[] => {
  return mockEventRequests.filter((event) => event.vendorName === vendorName);
};
