import eventRepository from "../repositories/event.repository";
import {
  ICreateEventDTO,
  IApproveEventDTO,
  IRejectEventDTO,
  IEventQueryOptions,
  IPaginatedEventsResult,
} from "../types";
import { Types } from "mongoose";
import { ROLES } from "../constants";

export class EventService {
  async updateEventStatuses() {
    const now = new Date();
    const events = await eventRepository.findAll({
      status: { $in: ["PENDING", "APPROVED"] },
    });

    for (const event of events) {
      if (event.status === "PENDING") {
        const allDatesExpired = event.proposedDates.every(
          (date) => new Date(date) < now
        );

        if (allDatesExpired) {
          await eventRepository.updateById(event._id!, { status: "EXPIRED" });
        }
      } else if (event.status === "APPROVED" && event.confirmedDate) {
        if (new Date(event.confirmedDate) < now) {
          await eventRepository.updateById(event._id!, { status: "COMPLETE" });
        }
      }
    }

    return { success: true, message: "Event statuses updated" };
  }

  async checkEventStatus(eventId: string) {
    const event = await eventRepository.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    const now = new Date();

    if (event.status === "PENDING") {
      const allDatesExpired = event.proposedDates.every(
        (date) => new Date(date) < now
      );

      if (allDatesExpired) {
        return await eventRepository.updateById(eventId, { status: "EXPIRED" });
      }
    } else if (event.status === "APPROVED" && event.confirmedDate) {
      if (new Date(event.confirmedDate) < now) {
        return await eventRepository.updateById(eventId, {
          status: "COMPLETE",
        });
      }
    }

    return event;
  }

  async createEvent(data: ICreateEventDTO, companyInfoId: Types.ObjectId) {
    const hasDates = data.proposedDates && data.proposedDates.length > 0;
    const initialStatus = hasDates ? "PENDING" : "AWAITING_VENDOR_PROPOSAL";

    return await eventRepository.create({
      title: data.title,
      description: data.description,
      category: data.category,
      proposedDates: data.proposedDates || [],
      location: data.location,
      duration: data.duration,
      audience: data.audience,
      assignedVendorId: new Types.ObjectId(data.assignedVendorId),
      companyInfo: companyInfoId,
      status: initialStatus,
    });
  }

  async getEvents(
    userId: Types.ObjectId,
    userRole: string,
    queryOptions: IEventQueryOptions = {}
  ): Promise<IPaginatedEventsResult> {
    const baseFilter: Record<string, Types.ObjectId> = {};

    if (userRole === ROLES.HR) {
      baseFilter.companyInfo = userId;
    } else if (userRole === ROLES.VENDOR) {
      baseFilter.assignedVendorId = userId;
    }

    await this.updateEventStatuses();

    return await eventRepository.findWithOptions({
      ...queryOptions,
      filter: baseFilter,
    });
  }

  async getEventById(eventId: string) {
    const event = await this.checkEventStatus(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  }

  async approveEvent(
    eventId: string,
    data: IApproveEventDTO,
    userId: Types.ObjectId,
    userRole: string
  ) {
    const event = await eventRepository.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    const now = new Date();

    if (event.status === "PENDING" && userRole === ROLES.VENDOR) {
      if (data.confirmedDate) {
        const validDates = event.proposedDates.filter(
          (date) => new Date(date) >= now
        );

        if (validDates.length === 0) {
          await eventRepository.updateById(eventId, { status: "EXPIRED" });
          throw new Error("All proposed dates have expired");
        }

        const confirmedDate = new Date(data.confirmedDate);
        const isValidDate = event.proposedDates.some(
          (date) => new Date(date).getTime() === confirmedDate.getTime()
        );

        if (!isValidDate) {
          throw new Error("Confirmed date must be one of the proposed dates");
        }

        if (confirmedDate < now) {
          throw new Error("Confirmed date must be in the future");
        }

        return await eventRepository.updateById(eventId, {
          status: "APPROVED",
          confirmedDate: data.confirmedDate,
          approvedVendorId: userId,
        });
      }

      if (data.proposedDates && data.proposedDates.length > 0) {
        const allDatesValid = data.proposedDates.every(
          (date: Date) => new Date(date) >= now
        );

        if (!allDatesValid) {
          throw new Error("All proposed dates must be in the future");
        }

        return await eventRepository.updateById(eventId, {
          status: "AWAITING_HR_APPROVAL",
          proposedDates: data.proposedDates,
        });
      }

      throw new Error("Either confirmed date or proposed dates are required");
    }

    if (
      event.status === "AWAITING_VENDOR_PROPOSAL" &&
      userRole === ROLES.VENDOR
    ) {
      if (!data.proposedDates || data.proposedDates.length === 0) {
        throw new Error("Proposed dates are required");
      }

      const allDatesValid = data.proposedDates.every(
        (date: Date) => new Date(date) >= now
      );

      if (!allDatesValid) {
        throw new Error("All proposed dates must be in the future");
      }

      return await eventRepository.updateById(eventId, {
        status: "AWAITING_HR_APPROVAL",
        proposedDates: data.proposedDates,
      });
    }

    if (event.status === "AWAITING_HR_APPROVAL" && userRole === ROLES.HR) {
      if (event.companyInfo.toString() !== userId.toString()) {
        throw new Error("You are not authorized to approve this event");
      }

      if (!data.confirmedDate) {
        throw new Error("Confirmed date is required");
      }

      const confirmedDate = new Date(data.confirmedDate);
      const isValidDate = event.proposedDates.some(
        (date) => new Date(date).getTime() === confirmedDate.getTime()
      );

      if (!isValidDate) {
        throw new Error(
          "Confirmed date must be one of the vendor's proposed dates"
        );
      }

      if (confirmedDate < now) {
        throw new Error("Confirmed date must be in the future");
      }

      return await eventRepository.updateById(eventId, {
        status: "APPROVED",
        confirmedDate: data.confirmedDate,
        approvedVendorId: event.assignedVendorId,
      });
    }

    throw new Error("Invalid operation for current event status");
  }

  async rejectEvent(
    eventId: string,
    data: IRejectEventDTO,
    userId: Types.ObjectId,
    userRole: string
  ) {
    const event = await eventRepository.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    if (event.status === "PENDING" && userRole === ROLES.VENDOR) {
      return await eventRepository.updateById(eventId, {
        status: "REJECTED",
        rejectionReason: data.rejectionReason,
        approvedVendorId: userId,
      });
    }

    if (event.status === "AWAITING_HR_APPROVAL" && userRole === ROLES.HR) {
      return await eventRepository.updateById(eventId, {
        status: "REJECTED",
        rejectionReason: data.rejectionReason,
      });
    }

    throw new Error("Invalid operation for current event status");
  }

  async deleteEvent(eventId: string, userId: Types.ObjectId, userRole: string) {
    const event = await eventRepository.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    if (userRole !== ROLES.HR) {
      throw new Error("Only HR can cancel events");
    }

    const companyInfoId =
      typeof event.companyInfo === "object" && event.companyInfo._id
        ? event.companyInfo._id.toString()
        : event.companyInfo.toString();

    if (companyInfoId !== userId.toString()) {
      throw new Error("You are not authorized to cancel this event");
    }

    await eventRepository.deleteById(eventId);
  }
}

export default new EventService();
