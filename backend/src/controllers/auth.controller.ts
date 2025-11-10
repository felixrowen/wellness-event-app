import { Request, Response } from "express";
import authService from "../services/auth.service";
import response from "../utils/response.util";
import { IReqUser } from "../types";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      response.success(res, result, "Registration successful!");
    } catch (error) {
      response.error(res, error, "Registration failed");
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await authService.login(req.body);
      response.success(res, { "token": token }, "Login successful");
    } catch (error) {
      response.unauthorized(res, "Invalid credentials");
    }
  }

  async me(req: IReqUser, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return response.unauthorized(res, "User not authenticated");
      }

      const user = await authService.getProfile(userId);
      response.success(res, user, "Profile retrieved successfully");
    } catch (error) {
      response.error(res, error, "Failed to get profile");
    }
  }
}

export default new AuthController();
