import { Response } from "express";
import { Types } from "mongoose";
import eventService from "../services/event.service";
import response from "../utils/response.util";
import { IReqUser } from "../types";

export class EventController {
  async createEvent(req: IReqUser, res: Response) {
    try {
      const companyInfoId = req.user?.id;

      if (!companyInfoId) {
        return response.unauthorized(res, "User not authenticated");
      }

      const result = await eventService.createEvent(
        req.body,
        new Types.ObjectId(companyInfoId)
      );
      response.success(res, result, "Event created successfully!");
    } catch (error) {
      response.error(res, error, "Failed to create event");
    }
  }

  async getEvents(req: IReqUser, res: Response) {
    try {
      const { id, role } = req.user || {};

      if (!id || !role) {
        return response.unauthorized(res, "User not authenticated");
      }

      const { search, status, from, to, page = "1", limit = "10" } = req.query;

      const result = await eventService.getEvents(
        new Types.ObjectId(id),
        role,
        {
          search: search as string,
          status: status as string,
          from: from as string,
          to: to as string,
          page: parseInt(page as string, 10),
          limit: parseInt(limit as string, 10),
        }
      );

      response.pagination(
        res,
        { events: result.events },
        result.pagination,
        "Events retrieved successfully"
      );
    } catch (error) {
      response.error(res, error, "Failed to retrieve events");
    }
  }

  async getEventById(req: IReqUser, res: Response) {
    try {
      const event = await eventService.getEventById(req.params.id);
      response.success(res, event, "Event retrieved successfully");
    } catch (error) {
      response.error(res, error, "Failed to retrieve event");
    }
  }

  async approveEvent(req: IReqUser, res: Response) {
    try {
      const { id, role } = req.user || {};

      if (!id || !role) {
        return response.unauthorized(res, "User not authenticated");
      }

      const event = await eventService.approveEvent(
        req.params.id,
        req.body,
        new Types.ObjectId(id),
        role
      );
      response.success(res, event, "Event approved successfully");
    } catch (error) {
      response.error(res, error, "Failed to approve event");
    }
  }

  async rejectEvent(req: IReqUser, res: Response) {
    try {
      const { id, role } = req.user || {};

      if (!id || !role) {
        return response.unauthorized(res, "User not authenticated");
      }

      const event = await eventService.rejectEvent(
        req.params.id,
        req.body,
        new Types.ObjectId(id),
        role
      );
      response.success(res, event, "Event rejected successfully");
    } catch (error) {
      response.error(res, error, "Failed to reject event");
    }
  }

  async deleteEvent(req: IReqUser, res: Response) {
    try {
      const { id, role } = req.user || {};

      if (!id || !role) {
        return response.unauthorized(res, "User not authenticated");
      }

      await eventService.deleteEvent(
        req.params.id,
        new Types.ObjectId(id),
        role
      );
      response.success(res, null, "Event cancelled successfully");
    } catch (error) {
      response.error(res, error, "Failed to cancel event");
    }
  }
}

export default new EventController();
