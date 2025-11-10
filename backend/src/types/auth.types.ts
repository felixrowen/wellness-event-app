import { Request } from "express";
import { Types } from "mongoose";

export interface IUserToken {
  id?: Types.ObjectId;
  role?: string;
}

export interface IReqUser extends Request {
  user?: IUserToken;
}

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}
