import * as Yup from "yup";

export const createEventValidator = Yup.object({
  title: Yup.string().required("Title is required").trim(),
  description: Yup.string().required("Description is required").trim(),
  proposedDates: Yup.array()
    .of(Yup.date().required())
    .min(1, "At least one proposed date is required")
    .required("Proposed dates are required"),
  location: Yup.string().trim().optional(),
  assignedVendorId: Yup.string().required("Assigned vendor is required"),
});

export const approveEventValidator = Yup.object({
  confirmedDate: Yup.date().required("Confirmed date is required"),
});

export const rejectEventValidator = Yup.object({
  rejectionReason: Yup.string().required("Rejection reason is required").trim(),
});

export type CreateEventDTO = Yup.InferType<typeof createEventValidator>;
export type ApproveEventDTO = Yup.InferType<typeof approveEventValidator>;
export type RejectEventDTO = Yup.InferType<typeof rejectEventValidator>;
