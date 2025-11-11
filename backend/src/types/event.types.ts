import { Types } from "mongoose";
import { IEvent } from "../models/event.model";

export interface IEventQueryOptions {
  filter?: Record<string, unknown>;
  search?: string;
  status?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface IPaginatedEventsResult {
  events: IEvent[];
  pagination: {
    total: number;
    current: number;
    totalPages: number;
  };
}

export interface ICreateEventDTO {
  title: string;
  description: string;
  category: number;
  proposedDates?: Date[];
  location?: string;
  duration?: string;
  audience?: string;
  assignedVendorId: string;
}

export interface IApproveEventDTO {
  confirmedDate?: Date;
  proposedDates?: Date[];
}

export interface IRejectEventDTO {
  rejectionReason: string;
}

export interface IEventServiceParams {
  userId: Types.ObjectId;
  userRole: string;
  queryOptions?: IEventQueryOptions;
}
