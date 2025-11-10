import { Response, NextFunction } from "express";
import { IReqUser } from "../types";
import { verifyToken } from "../utils/jwt.util";
import response from "../utils/response.util";

export const authenticate = (
  req: IReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return response.unauthorized(res, "No token provided");
    }

    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return response.unauthorized(res, "Invalid token");
  }
};
