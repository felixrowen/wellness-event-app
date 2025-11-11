import { AxiosResponse } from "axios";

import endpoint from "./endpoint.constant";

import { ILogin, IRegister, IProfile, IAuthResponse } from "@/types/Auth";
import instance from "@/libs/axios/instance";

const authServices = {
  // Register new user (HR or Vendor)
  register: (
    payload: IRegister
  ): Promise<AxiosResponse<IAuthResponse<IProfile>>> =>
    instance.post(`${endpoint.AUTH}/register`, payload),

  // Login user
  login: (
    payload: ILogin
  ): Promise<AxiosResponse<IAuthResponse<{ token: string }>>> =>
    instance.post(`${endpoint.AUTH}/login`, payload),

  // Get current user profile
  getProfile: (): Promise<AxiosResponse<IAuthResponse<IProfile>>> =>
    instance.get(`${endpoint.AUTH}/me`),
};

export default authServices;
