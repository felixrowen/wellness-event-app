import { Request, Response, NextFunction } from "express";
import responseUtil from "../utils/response.util";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);
  return responseUtil.error(res, err, err.message || "Internal server error");
};
