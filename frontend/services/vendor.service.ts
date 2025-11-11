import endpoint from "./endpoint.constant";

import axiosInstance from "@/libs/axios/instance";
import { IVendorListResponse } from "@/types/Vendor";

const vendorServices = {
  getAllVendors: async (params?: {
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    return axiosInstance.get<IVendorListResponse>(endpoint.VENDORS, {
      params,
    });
  },
};

export default vendorServices;
