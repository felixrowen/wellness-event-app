import { Router } from "express";
import authController from "../controllers/auth.controller";
import { authenticate, validate } from "../middlewares";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator";

const router = Router();

router.post(
  "/register",
  validate(registerValidator),
  authController.register.bind(authController)
  /*
  #swagger.tags = ['Auth']
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/RegisterRequest"
    }
  }
  */
);

router.post(
  "/login",
  validate(loginValidator),
  authController.login.bind(authController)
  /*
  #swagger.tags = ['Auth']
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/LoginRequest"
    }
  }
  */
);

router.get(
  "/me",
  authenticate,
  authController.me.bind(authController)
  /*
  #swagger.tags = ['Auth']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
