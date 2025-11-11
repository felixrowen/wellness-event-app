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
    return axiosInstance.post<IEventResponse<IEvent>>("/events", data);
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
      "/events",
      { params },
    );
  },

  getEventById: async (id: string) => {
    return axiosInstance.get<IEventResponse<IEvent>>(`/events/${id}`);
  },

  approveEvent: async (id: string, data: IApproveEventDTO) => {
    return axiosInstance.put<IEventResponse<IEvent>>(
      `/events/${id}/approve`,
      data,
    );
  },

  rejectEvent: async (id: string, data: IRejectEventDTO) => {
    return axiosInstance.put<IEventResponse<IEvent>>(
      `/events/${id}/reject`,
      data,
    );
  },
};

export default eventServices;
