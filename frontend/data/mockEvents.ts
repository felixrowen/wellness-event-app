export interface EventRequest {
  id: string;
  eventName: string;
  companyName: string;
  vendorName: string;
  proposedDates: string[];
  proposedLocation: string;
  confirmedDate: string | null;
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "CANCELLED"
    | "EXPIRED"
    | "DONE";
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
  {
    id: "9",
    eventName: "Annual Team Building Event",
    companyName: "TechCorp Ltd",
    vendorName: "WellCare Services",
    proposedDates: ["2025-10-15", "2025-10-16", "2025-10-17"],
    proposedLocation: "Sentosa Beach, Singapore",
    confirmedDate: "2025-10-16",
    status: "DONE",
    remarks: "Successfully completed event with great participation",
    dateCreated: "2025-09-20T10:00:00Z",
    category: "Team Building",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
  },
  {
    id: "10",
    eventName: "Summer Yoga Retreat",
    companyName: "TechCorp Ltd",
    vendorName: "WellCare Services",
    proposedDates: ["2025-10-01", "2025-10-02", "2025-10-03"],
    proposedLocation: "Botanic Gardens, Singapore",
    confirmedDate: null,
    status: "EXPIRED",
    remarks: "No response received before proposed dates",
    dateCreated: "2025-09-15T09:00:00Z",
    category: "Health & Wellness",
    imageUrl:
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&auto=format&fit=crop",
  },
  {
    id: "11",
    eventName: "Company Anniversary Gala",
    companyName: "TechCorp Ltd",
    vendorName: "WellCare Services",
    proposedDates: ["2025-12-10", "2025-12-11", "2025-12-12"],
    proposedLocation: "Marina Bay Sands, Singapore",
    confirmedDate: null,
    status: "CANCELLED",
    remarks: "Event cancelled due to budget constraints",
    dateCreated: "2025-11-01T14:00:00Z",
    category: "Corporate Event",
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop",
  },
  {
    id: "12",
    eventName: "Leadership Training Workshop",
    companyName: "Global Innovations Inc",
    vendorName: "WellCare Services",
    proposedDates: ["2025-09-20", "2025-09-21", "2025-09-22"],
    proposedLocation: "Conference Center, Singapore",
    confirmedDate: "2025-09-21",
    status: "DONE",
    remarks: "Excellent feedback from participants",
    dateCreated: "2025-08-25T11:00:00Z",
    category: "Training & Development",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
  },
  {
    id: "13",
    eventName: "Holiday Party Planning",
    companyName: "StartUp Hub",
    vendorName: "WellCare Services",
    proposedDates: ["2025-09-10", "2025-09-11", "2025-09-12"],
    proposedLocation: "Clarke Quay, Singapore",
    confirmedDate: null,
    status: "EXPIRED",
    remarks: "Vendor did not respond in time",
    dateCreated: "2025-08-20T16:00:00Z",
    category: "Entertainment",
    imageUrl:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop",
  },
  {
    id: "14",
    eventName: "Quarterly Sales Kickoff",
    companyName: "Finance Corp",
    vendorName: "WellCare Services",
    proposedDates: ["2025-12-05", "2025-12-06", "2025-12-07"],
    proposedLocation: "Raffles Hotel, Singapore",
    confirmedDate: null,
    status: "CANCELLED",
    remarks: "Cancelled by HR - rescheduling needed",
    dateCreated: "2025-10-28T10:30:00Z",
    category: "Corporate Event",
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop",
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
