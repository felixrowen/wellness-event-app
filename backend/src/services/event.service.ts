import eventRepository from "../repositories/event.repository";
import {
  CreateEventDTO,
  ApproveEventDTO,
  RejectEventDTO,
} from "../validators/event.validator";
import { IEvent } from "../models/event.model";
import { Types } from "mongoose";
import { ROLES } from "../constants";

export class EventService {
  async updateEventStatuses() {
    try {
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
            await eventRepository.updateById(event._id!, {
              status: "EXPIRED",
            });
          }
        } else if (event.status === "APPROVED" && event.confirmedDate) {
          if (new Date(event.confirmedDate) < now) {
            await eventRepository.updateById(event._id!, {
              status: "COMPLETE",
            });
          }
        }
      }

      return { success: true, message: "Event statuses updated" };
    } catch (error: any) {
      throw error;
    }
  }

  async checkEventStatus(eventId: string) {
    try {
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
          return await eventRepository.updateById(eventId, {
            status: "EXPIRED",
          });
        }
      } else if (event.status === "APPROVED" && event.confirmedDate) {
        if (new Date(event.confirmedDate) < now) {
          return await eventRepository.updateById(eventId, {
            status: "COMPLETE",
          });
        }
      }

      return event;
    } catch (error: any) {
      throw error;
    }
  }

  async createEvent(data: CreateEventDTO, hrId: Types.ObjectId) {
    try {
      const event = await eventRepository.create({
        title: data.title,
        description: data.description,
        proposedDates: data.proposedDates,
        location: data.location,
        assignedVendorId: new Types.ObjectId(data.assignedVendorId),
        hrId,
        status: "PENDING",
      });

      return event;
    } catch (error: any) {
      throw error;
    }
  }

  async getEvents(userId: Types.ObjectId, userRole: string) {
    try {
      let events: IEvent[] = [];

      if (userRole === ROLES.HR) {
        events = await eventRepository.findByHrId(userId);
      } else if (userRole === ROLES.VENDOR) {
        events = await eventRepository.findAll({
          assignedVendorId: userId,
        });
      }

      await this.updateEventStatuses();

      if (userRole === ROLES.HR) {
        events = await eventRepository.findByHrId(userId);
      } else if (userRole === ROLES.VENDOR) {
        events = await eventRepository.findAll({
          assignedVendorId: userId,
        });
      }

      return events;
    } catch (error: any) {
      throw error;
    }
  }

  async getEventById(eventId: string | Types.ObjectId) {
    try {
      const event = await this.checkEventStatus(eventId as string);

      if (!event) {
        throw new Error("Event not found");
      }

      return event;
    } catch (error: any) {
      throw error;
    }
  }

  async approveEvent(
    eventId: string | Types.ObjectId,
    data: ApproveEventDTO,
    vendorId: Types.ObjectId
  ) {
    try {
      const event = await eventRepository.findById(eventId);

      if (!event) {
        throw new Error("Event not found");
      }

      if (event.status !== "PENDING") {
        throw new Error("Event is not in pending status");
      }

      const now = new Date();
      const validDates = event.proposedDates.filter(
        (date) => new Date(date) >= now
      );

      if (validDates.length === 0) {
        await eventRepository.updateById(eventId, {
          status: "EXPIRED",
        });
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

      const updatedEvent = await eventRepository.updateById(eventId, {
        status: "APPROVED",
        confirmedDate: data.confirmedDate,
        approvedVendorId: vendorId,
      });

      return updatedEvent;
    } catch (error: any) {
      throw error;
    }
  }

  async rejectEvent(
    eventId: string | Types.ObjectId,
    data: RejectEventDTO,
    vendorId: Types.ObjectId
  ) {
    try {
      const event = await eventRepository.findById(eventId);

      if (!event) {
        throw new Error("Event not found");
      }

      if (event.status !== "PENDING") {
        throw new Error("Event is not in pending status");
      }

      if (event.assignedVendorId.toString() !== vendorId.toString()) {
        throw new Error("You are not authorized to reject this event");
      }

      const updatedEvent = await eventRepository.updateById(eventId, {
        status: "REJECTED",
        rejectionReason: data.rejectionReason,
        approvedVendorId: vendorId,
      });

      return updatedEvent;
    } catch (error: any) {
      throw error;
    }
  }
}

export default new EventService();
