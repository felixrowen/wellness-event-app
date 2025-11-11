import endpoint from "./endpoint.constant";

import axiosInstance from "@/libs/axios/instance";
import {
  ICreateEventDTO,
  IEventResponse,
  IEvent,
  IPaginatedEventsResponse,
  IApproveEventDTO,
  IRejectEventDTO,
} from "@/types/Event";

const eventServices = {
  createEvent: async (data: ICreateEventDTO) => {
    return axiosInstance.post<IEventResponse<IEvent>>(endpoint.EVENTS, data);
  },

  getEvents: async (params?: {
    status?: string;
    search?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
  }) => {
    return axiosInstance.get<IEventResponse<IPaginatedEventsResponse>>(
      endpoint.EVENTS,
      { params },
    );
  },

  getEventById: async (id: string) => {
    return axiosInstance.get<IEventResponse<IEvent>>(
      `${endpoint.EVENTS}/${id}`,
    );
  },

  approveEvent: async (id: string, data: IApproveEventDTO) => {
    return axiosInstance.put<IEventResponse<IEvent>>(
      `${endpoint.EVENTS}/${id}/approve`,
      data,
    );
  },

  rejectEvent: async (id: string, data: IRejectEventDTO) => {
    return axiosInstance.put<IEventResponse<IEvent>>(
      `${endpoint.EVENTS}/${id}/reject`,
      data,
    );
  },

  deleteEvent: async (id: string) => {
    return axiosInstance.delete<IEventResponse<null>>(
      `${endpoint.EVENTS}/${id}`,
    );
  },
};

export default eventServices;
