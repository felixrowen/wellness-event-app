import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import response from "../utils/response.util";

export const validate = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      return response.error(res, error, "Validation failed");
    }
  };
};
