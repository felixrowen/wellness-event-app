import mongoose, { Types } from "mongoose";

export interface IEvent {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  proposedDates: Date[];
  confirmedDate?: Date;
  location?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETE" | "EXPIRED";
  hrId: Types.ObjectId;
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
    proposedDates: {
      type: [Date],
      required: true,
      validate: {
        validator: function (dates: Date[]) {
          return dates && dates.length > 0;
        },
        message: "At least one proposed date is required",
      },
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
      enum: ["PENDING", "APPROVED", "REJECTED", "COMPLETE", "EXPIRED"],
      default: "PENDING",
    },
    hrId: {
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
