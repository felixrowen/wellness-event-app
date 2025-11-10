import { Request, Response } from "express";
import vendorService from "../services/vendor.service";
import eventService from "../services/event.service";
import response from "../utils/response.util";
import { IReqUser } from "../types";

export class VendorController {
  async getAllVendors(req: Request, res: Response) {
    try {
      const vendors = await vendorService.getAllVendors();
      response.success(res, vendors, "Vendors retrieved successfully");
    } catch (error) {
      response.error(res, error, "Failed to retrieve vendors");
    }
  }

  async approveEvent(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const vendorId = req.user?.id;

      if (!vendorId) {
        return response.unauthorized(res, "User not authenticated");
      }

      const event = await eventService.approveEvent(id, req.body, vendorId);
      response.success(res, event, "Event approved successfully");
    } catch (error) {
      response.error(res, error, "Failed to approve event");
    }
  }

  async rejectEvent(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const vendorId = req.user?.id;

      if (!vendorId) {
        return response.unauthorized(res, "User not authenticated");
      }

      const event = await eventService.rejectEvent(id, req.body, vendorId);
      response.success(res, event, "Event rejected successfully");
    } catch (error) {
      response.error(res, error, "Failed to reject event");
    }
  }
}

export default new VendorController();
