import jwt from "jsonwebtoken";
import { config } from "../config";
import { IUserToken } from "../types";

export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, config.secret, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = (token: string): IUserToken => {
  const user = jwt.verify(token, config.secret) as IUserToken;
  return user;
};
