import { Response } from "express";
import eventService from "../services/event.service";
import response from "../utils/response.util";
import { IReqUser } from "../types";

export class EventController {
  async createEvent(req: IReqUser, res: Response) {
    try {
      const hrId = req.user?.id;

      if (!hrId) {
        return response.unauthorized(res, "User not authenticated");
      }

      const result = await eventService.createEvent(req.body, hrId);
      response.success(res, result, "Event created successfully!");
    } catch (error) {
      response.error(res, error, "Failed to create event");
    }
  }

  async getEvents(req: IReqUser, res: Response) {
    try {
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId || !userRole) {
        return response.unauthorized(res, "User not authenticated");
      }

      const events = await eventService.getEvents(userId, userRole);
      response.success(res, events, "Events retrieved successfully");
    } catch (error) {
      response.error(res, error, "Failed to retrieve events");
    }
  }

  async getEventById(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const event = await eventService.getEventById(id);
      response.success(res, event, "Event retrieved successfully");
    } catch (error) {
      response.error(res, error, "Failed to retrieve event");
    }
  }

  async approveEvent(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId || !userRole) {
        return response.unauthorized(res, "User not authenticated");
      }

      const event = await eventService.approveEvent(
        id,
        req.body,
        userId,
        userRole
      );
      response.success(res, event, "Event approved successfully");
    } catch (error) {
      response.error(res, error, "Failed to approve event");
    }
  }

  async rejectEvent(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId || !userRole) {
        return response.unauthorized(res, "User not authenticated");
      }

      const event = await eventService.rejectEvent(
        id,
        req.body,
        userId,
        userRole
      );
      response.success(res, event, "Event rejected successfully");
    } catch (error) {
      response.error(res, error, "Failed to reject event");
    }
  }
}

export default new EventController();
