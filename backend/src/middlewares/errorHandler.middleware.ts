import { Request, Response, NextFunction } from "express";
import responseUtil from "../utils/response.util";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return responseUtil.error(res, err, err.message || "Internal server error");
};
