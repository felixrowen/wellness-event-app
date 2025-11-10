import { Session } from "next-auth";

export interface SessionExtended extends Session {
  accessToken?: string;
}
