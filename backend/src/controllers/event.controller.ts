import { Response } from "express";
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

      const result = await eventService.createEvent(req.body, companyInfoId);
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

      const { search, status, from, to, page = "1", limit = "10" } = req.query;

      const queryOptions = {
        search: search as string,
        status: status as string,
        from: from as string,
        to: to as string,
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
      };

      const result = await eventService.getEvents(
        userId,
        userRole,
        queryOptions
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
