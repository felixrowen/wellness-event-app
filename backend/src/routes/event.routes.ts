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
  /*
  #swagger.tags = ['Events']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateEventRequest"
    }
  }
  */
);

router.get(
  "/",
  authenticate,
  AccessControlLimit([ROLES.HR, ROLES.VENDOR]),
  eventController.getEvents.bind(eventController)
  /*
  #swagger.tags = ['Events']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

router.get(
  "/:id",
  authenticate,
  AccessControlLimit([ROLES.HR, ROLES.VENDOR]),
  eventController.getEventById.bind(eventController)
  /*
  #swagger.tags = ['Events']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

router.put(
  "/:id/approve",
  authenticate,
  AccessControlLimit([ROLES.HR, ROLES.VENDOR]),
  validate(approveEventValidator),
  eventController.approveEvent.bind(eventController)
  /*
  #swagger.tags = ['Events']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/ApproveEventRequest"
    }
  }
  */
);

router.put(
  "/:id/reject",
  authenticate,
  AccessControlLimit([ROLES.HR, ROLES.VENDOR]),
  validate(rejectEventValidator),
  eventController.rejectEvent.bind(eventController)
  /*
  #swagger.tags = ['Events']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/RejectEventRequest"
    }
  }
  */
);

router.delete(
  "/:id",
  authenticate,
  AccessControlLimit([ROLES.HR]),
  eventController.deleteEvent.bind(eventController)
  /*
  #swagger.tags = ['Events']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
