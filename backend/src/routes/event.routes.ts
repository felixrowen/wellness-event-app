import { Router } from "express";
import eventController from "../controllers/event.controller";
import vendorController from "../controllers/vendor.controller";
import { authenticate, validate, AccessControlLimit } from "../middlewares";
import {
  createEventValidator,
  approveEventValidator,
  rejectEventValidator,
} from "../validators/event.validator";
import { ROLES } from "../constants";

const router = Router();

router.post(
  "/",
  authenticate,
  AccessControlLimit([ROLES.HR]),
  validate(createEventValidator),
  eventController.createEvent.bind(eventController)
);

router.get(
  "/",
  authenticate,
  AccessControlLimit([ROLES.HR, ROLES.VENDOR]),
  eventController.getEvents.bind(eventController)
);

router.get(
  "/:id",
  authenticate,
  AccessControlLimit([ROLES.HR, ROLES.VENDOR]),
  eventController.getEventById.bind(eventController)
);

router.put(
  "/:id/approve",
  authenticate,
  AccessControlLimit([ROLES.VENDOR]),
  validate(approveEventValidator),
  vendorController.approveEvent.bind(vendorController)
);

router.put(
  "/:id/reject",
  authenticate,
  AccessControlLimit([ROLES.VENDOR]),
  validate(rejectEventValidator),
  vendorController.rejectEvent.bind(vendorController)
);

export default router;
