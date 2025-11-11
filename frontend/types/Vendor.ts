export interface IVendor {
  _id: string;
  fullName: string;
  email: string;
  role: "VENDOR";
  vendorName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IVendorListResponse {
  success: boolean;
  message: string;
  data: {
    vendors: IVendor[];
  };
}
