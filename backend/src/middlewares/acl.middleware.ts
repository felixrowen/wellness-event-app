import { Response, NextFunction } from "express";
import { IReqUser } from "../types";
import response from "../utils/response.util";

export const AccessControlLimit = (roles: string[]) => {
  return (req: IReqUser, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      return response.unauthorized(res, "forbidden");
    }
    next();
  };
};
