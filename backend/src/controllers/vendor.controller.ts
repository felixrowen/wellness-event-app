import { Request, Response } from "express";
import vendorService from "../services/vendor.service";
import response from "../utils/response.util";

export class VendorController {
  async getAllVendors(req: Request, res: Response) {
    try {
      const vendors = await vendorService.getAllVendors();
      response.success(res, vendors, "Vendors retrieved successfully");
    } catch (error) {
      response.error(res, error, "Failed to retrieve vendors");
    }
  }
}

export default new VendorController();
