import { Router } from "express";
import vendorController from "../controllers/vendor.controller";
import { authenticate, AccessControlLimit } from "../middlewares";
import { ROLES } from "../constants";

const router = Router();

router.get(
  "/",
  authenticate,
  AccessControlLimit([ROLES.HR]),
  vendorController.getAllVendors.bind(vendorController)
  /*
  #swagger.tags = ['Vendors']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
