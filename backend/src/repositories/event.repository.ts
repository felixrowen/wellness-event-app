import EventModel, { IEvent } from "../models/event.model";
import { Types } from "mongoose";
import { IEventQueryOptions, IPaginatedEventsResult } from "../types";

export class EventRepository {
  async create(eventData: Partial<IEvent>): Promise<IEvent> {
    return EventModel.create(eventData);
  }

  async findById(id: string | Types.ObjectId): Promise<IEvent | null> {
    return EventModel.findById(id)
      .populate("companyInfo", "fullName email companyName")
      .populate("assignedVendorId", "fullName email vendorName")
      .populate("approvedVendorId", "fullName email vendorName");
  }

  async findAll(filter = {}): Promise<IEvent[]> {
    return EventModel.find(filter)
      .populate("companyInfo", "fullName email companyName")
      .populate("assignedVendorId", "fullName email vendorName")
      .populate("approvedVendorId", "fullName email vendorName")
      .sort({ createdAt: -1 });
  }

  async findWithOptions(
    options: IEventQueryOptions
  ): Promise<IPaginatedEventsResult> {
    const {
      filter = {},
      search,
      status,
      from,
      to,
      page = 1,
      limit = 10,
    } = options;

    const query = { ...filter };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (from || to) {
      query.confirmedDate = {} as any;
      if (from) {
        (query.confirmedDate as any).$gte = new Date(from);
      }
      if (to) {
        (query.confirmedDate as any).$lte = new Date(to);
      }
    }

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      EventModel.find(query)
        .populate("companyInfo", "fullName email companyName")
        .populate("assignedVendorId", "fullName email vendorName")
        .populate("approvedVendorId", "fullName email vendorName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      EventModel.countDocuments(query),
    ]);

    return {
      events,
      pagination: {
        total,
        current: page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByCompanyInfo(
    companyInfoId: string | Types.ObjectId
  ): Promise<IEvent[]> {
    return EventModel.find({ companyInfo: companyInfoId })
      .populate("companyInfo", "fullName email companyName")
      .populate("assignedVendorId", "fullName email vendorName")
      .populate("approvedVendorId", "fullName email vendorName")
      .sort({ createdAt: -1 });
  }

  async updateById(
    id: string | Types.ObjectId,
    data: Partial<IEvent>
  ): Promise<IEvent | null> {
    return EventModel.findByIdAndUpdate(id, data, { new: true })
      .populate("companyInfo", "fullName email companyName")
      .populate("assignedVendorId", "fullName email vendorName")
      .populate("approvedVendorId", "fullName email vendorName");
  }

  async deleteById(id: string | Types.ObjectId): Promise<IEvent | null> {
    return EventModel.findByIdAndDelete(id);
  }
}

export default new EventRepository();
