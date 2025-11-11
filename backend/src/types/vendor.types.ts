import { IUser } from "../models/user.model";

export interface IVendorListResult {
  vendors: IUser[];
}

export interface IVendorQueryOptions {
  search?: string;
  page?: number;
  limit?: number;
}
