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
);

router.post(
  "/login",
  validate(loginValidator),
  authController.login.bind(authController)
);

router.get("/me", authenticate, authController.me.bind(authController));

export default router;
