import mongoose, { Types } from "mongoose";
import { EVENT_CATEGORY } from "../constants";

export interface IEvent {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  category: EVENT_CATEGORY;
  proposedDates: Date[];
  confirmedDate?: Date;
  location?: string;
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "COMPLETE"
    | "EXPIRED"
    | "AWAITING_VENDOR_PROPOSAL"
    | "AWAITING_HR_APPROVAL";
  companyInfo: Types.ObjectId;
  assignedVendorId: Types.ObjectId;
  approvedVendorId?: Types.ObjectId;
  rejectionReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const EventSchema = new mongoose.Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Number,
      enum: Object.values(EVENT_CATEGORY).filter((v) => typeof v === "number"),
      required: true,
    },
    proposedDates: {
      type: [Date],
      required: false,
      default: [],
    },
    confirmedDate: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: [
        "PENDING",
        "APPROVED",
        "REJECTED",
        "COMPLETE",
        "EXPIRED",
        "AWAITING_VENDOR_PROPOSAL",
        "AWAITING_HR_APPROVAL",
      ],
      default: "PENDING",
    },
    companyInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedVendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvedVendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    rejectionReason: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

EventSchema.methods.toJSON = function () {
  const event = this.toObject();
  delete event.__v;
  return event;
};

const EventModel = mongoose.model<IEvent>("Event", EventSchema);

export default EventModel;
