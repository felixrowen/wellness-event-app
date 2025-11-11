import * as Yup from "yup";
import { ICreateEventDTO, IApproveEventDTO, IRejectEventDTO } from "../types";

export const createEventValidator = Yup.object({
  title: Yup.string().required("Title is required").trim(),
  description: Yup.string().required("Description is required").trim(),
  category: Yup.number()
    .required("Category is required")
    .oneOf([1, 2, 3, 4, 5, 6], "Invalid Category"),
  proposedDates: Yup.array().of(Yup.date().required()).optional().default([]),
  location: Yup.string().trim().optional(),
  assignedVendorId: Yup.string().required("Assigned vendor is required"),
});

export const approveEventValidator = Yup.object({
  confirmedDate: Yup.date().optional(),
  proposedDates: Yup.array().of(Yup.date().required()).optional(),
});

export const rejectEventValidator = Yup.object({
  rejectionReason: Yup.string().required("Rejection reason is required").trim(),
});

export type CreateEventDTO = ICreateEventDTO;
export type ApproveEventDTO = IApproveEventDTO;
export type RejectEventDTO = IRejectEventDTO;
