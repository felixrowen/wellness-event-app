import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface UserExtended extends User {
  _id?: string;
  accessToken?: string;
  role?: "HR" | "VENDOR";
  fullName?: string;
  email?: string;
  companyName?: string;
  vendorName?: string;
}

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "HR" | "VENDOR";
  companyName?: string;
  vendorName?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IProfile {
  _id: string;
  fullName: string;
  email: string;
  role: "HR" | "VENDOR";
  companyName?: string;
  vendorName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type { SessionExtended, JWTExtended, UserExtended };
