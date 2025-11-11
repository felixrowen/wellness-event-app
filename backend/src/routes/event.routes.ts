import { Router } from "express";
import eventController from "../controllers/event.controller";
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
  AccessControlLimit([ROLES.HR, ROLES.VENDOR]),
  validate(approveEventValidator),
  eventController.approveEvent.bind(eventController)
);

router.put(
  "/:id/reject",
  authenticate,
  AccessControlLimit([ROLES.HR, ROLES.VENDOR]),
  validate(rejectEventValidator),
  eventController.rejectEvent.bind(eventController)
);

router.delete(
  "/:id",
  authenticate,
  AccessControlLimit([ROLES.HR]),
  eventController.deleteEvent.bind(eventController)
);

export default router;
