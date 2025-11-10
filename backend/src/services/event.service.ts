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
      const hasDates = data.proposedDates && data.proposedDates.length > 0;
      const initialStatus = hasDates ? "PENDING" : "AWAITING_VENDOR_PROPOSAL";

      const event = await eventRepository.create({
        title: data.title,
        description: data.description,
        proposedDates: data.proposedDates || [],
        location: data.location,
        assignedVendorId: new Types.ObjectId(data.assignedVendorId),
        hrId,
        status: initialStatus,
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
    userId: Types.ObjectId,
    userRole: string
  ) {
    try {
      const event = await eventRepository.findById(eventId);

      if (!event) {
        throw new Error("Event not found");
      }

      const now = new Date();

      // Flow: Vendor approves HR's proposed dates
      if (event.status === "PENDING" && userRole === ROLES.VENDOR) {
        if (!data.confirmedDate) {
          throw new Error("Confirmed date is required");
        }

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
          approvedVendorId: userId,
        });

        return updatedEvent;
      }

      // Flow: Vendor proposes dates (when HR didn't provide dates)
      if (
        event.status === "AWAITING_VENDOR_PROPOSAL" &&
        userRole === ROLES.VENDOR
      ) {
        if (!data.proposedDates || data.proposedDates.length === 0) {
          throw new Error("Proposed dates are required");
        }

        const allDatesValid = data.proposedDates.every(
          (date) => new Date(date) >= now
        );

        if (!allDatesValid) {
          throw new Error("All proposed dates must be in the future");
        }

        const updatedEvent = await eventRepository.updateById(eventId, {
          status: "AWAITING_HR_APPROVAL",
          proposedDates: data.proposedDates,
        });

        return updatedEvent;
      }

      // Flow: HR approves vendor's proposed dates
      if (event.status === "AWAITING_HR_APPROVAL" && userRole === ROLES.HR) {
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

        const updatedEvent = await eventRepository.updateById(eventId, {
          status: "APPROVED",
          confirmedDate: data.confirmedDate,
          approvedVendorId: event.assignedVendorId,
        });

        return updatedEvent;
      }

      throw new Error("Invalid operation for current event status");
    } catch (error: any) {
      throw error;
    }
  }

  async rejectEvent(
    eventId: string | Types.ObjectId,
    data: RejectEventDTO,
    userId: Types.ObjectId,
    userRole: string
  ) {
    try {
      const event = await eventRepository.findById(eventId);

      if (!event) {
        throw new Error("Event not found");
      }

      if (event.status === "PENDING" && userRole === ROLES.VENDOR) {
        if (event.assignedVendorId.toString() !== userId.toString()) {
          throw new Error("You are not authorized to reject this event");
        }

        const updatedEvent = await eventRepository.updateById(eventId, {
          status: "REJECTED",
          rejectionReason: data.rejectionReason,
          approvedVendorId: userId,
        });

        return updatedEvent;
      }

      if (event.status === "AWAITING_HR_APPROVAL" && userRole === ROLES.HR) {
        if (event.hrId.toString() !== userId.toString()) {
          throw new Error("You are not authorized to reject this event");
        }

        const updatedEvent = await eventRepository.updateById(eventId, {
          status: "REJECTED",
          rejectionReason: data.rejectionReason,
        });

        return updatedEvent;
      }

      throw new Error("Invalid operation for current event status");
    } catch (error: any) {
      throw error;
    }
  }
}

export default new EventService();
