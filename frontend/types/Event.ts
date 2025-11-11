export enum EVENT_CATEGORY {
  HEALTH_SCREENING = 1,
  MENTAL_WELLNESS = 2,
  FITNESS_EXERCISE = 3,
  DIET_NUTRITION = 4,
  WORK_LIFE_BALANCE = 5,
  HEALTH_TALK_EDUCATION = 6,
}

export const EVENT_CATEGORY_LABELS: Record<EVENT_CATEGORY, string> = {
  [EVENT_CATEGORY.HEALTH_SCREENING]: "Health Screening",
  [EVENT_CATEGORY.MENTAL_WELLNESS]: "Mental Wellness",
  [EVENT_CATEGORY.FITNESS_EXERCISE]: "Fitness & Exercise",
  [EVENT_CATEGORY.DIET_NUTRITION]: "Diet & Nutrition",
  [EVENT_CATEGORY.WORK_LIFE_BALANCE]: "Work-Life Balance",
  [EVENT_CATEGORY.HEALTH_TALK_EDUCATION]: "Health Talk & Education",
};

export type EventStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETE"
  | "EXPIRED"
  | "AWAITING_VENDOR_PROPOSAL"
  | "AWAITING_HR_APPROVAL";

interface CompanyInfo {
  _id: string;
  companyName: string;
  fullName: string;
  email: string;
}
export interface IEvent {
  _id: string;
  title: string;
  description: string;
  category: EVENT_CATEGORY;
  proposedDates: string[];
  confirmedDate?: string;
  location?: string;
  duration?: string;
  audience?: string;
  status: EventStatus;
  companyInfo: CompanyInfo;
  assignedVendorId: string;
  approvedVendorId?: string;
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateEventDTO {
  title: string;
  description: string;
  category: number;
  proposedDates?: string[];
  location?: string;
  duration?: string;
  audience?: string;
  assignedVendorId: string;
}

export interface IApproveEventDTO {
  confirmedDate?: string;
  proposedDates?: string[];
}

export interface IRejectEventDTO {
  rejectionReason: string;
}

export interface IEventResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IPaginatedEventsResponse {
  events: IEvent[];
  pagination: {
    total: number;
    current: number;
    totalPages: number;
  };
}
