import EventModel, { IEvent } from "../models/event.model";
import { Types } from "mongoose";

export class EventRepository {
  async create(eventData: Partial<IEvent>): Promise<IEvent> {
    return EventModel.create(eventData);
  }

  async findById(id: string | Types.ObjectId): Promise<IEvent | null> {
    return EventModel.findById(id)
      .populate("hrId", "fullName email companyName")
      .populate("assignedVendorId", "fullName email vendorName")
      .populate("approvedVendorId", "fullName email vendorName");
  }

  async findAll(filter: any = {}): Promise<IEvent[]> {
    return EventModel.find(filter)
      .populate("hrId", "fullName email companyName")
      .populate("assignedVendorId", "fullName email vendorName")
      .populate("approvedVendorId", "fullName email vendorName")
      .sort({ createdAt: -1 });
  }

  async findByHrId(hrId: string | Types.ObjectId): Promise<IEvent[]> {
    return EventModel.find({ hrId })
      .populate("hrId", "fullName email companyName")
      .populate("assignedVendorId", "fullName email vendorName")
      .populate("approvedVendorId", "fullName email vendorName")
      .sort({ createdAt: -1 });
  }

  async updateById(
    id: string | Types.ObjectId,
    data: Partial<IEvent>
  ): Promise<IEvent | null> {
    return EventModel.findByIdAndUpdate(id, data, { new: true })
      .populate("hrId", "fullName email companyName")
      .populate("assignedVendorId", "fullName email vendorName")
      .populate("approvedVendorId", "fullName email vendorName");
  }

  async deleteById(id: string | Types.ObjectId): Promise<IEvent | null> {
    return EventModel.findByIdAndDelete(id);
  }
}

export default new EventRepository();
