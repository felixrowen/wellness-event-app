import { AxiosResponse } from "axios";

import endpoint from "./endpoint.constant";

import { ILogin, IRegister, IProfile, IAuthResponse } from "@/types/Auth";
import instance from "@/libs/axios/instance";

const authServices = {
  register: (
    payload: IRegister,
  ): Promise<AxiosResponse<IAuthResponse<IProfile>>> =>
    instance.post(`${endpoint.AUTH}/register`, payload),

  login: (
    payload: ILogin,
  ): Promise<AxiosResponse<IAuthResponse<{ token: string }>>> =>
    instance.post(`${endpoint.AUTH}/login`, payload),

  getProfile: (): Promise<AxiosResponse<IAuthResponse<IProfile>>> =>
    instance.get(`${endpoint.AUTH}/me`),
};

export default authServices;
