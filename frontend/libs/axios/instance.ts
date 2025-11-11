import { getSession } from "next-auth/react";
import axios from "axios";

import environment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await getSession();

    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { signOut } = await import("next-auth/react");

      await signOut({ redirect: false });
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  },
);

export default instance;
