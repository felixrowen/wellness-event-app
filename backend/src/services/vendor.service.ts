import userRepository from "../repositories/user.repository";

export class VendorService {
  async getAllVendors() {
    try {
      const vendors = await userRepository.findAllVendors();
      return vendors;
    } catch (error: any) {
      throw error;
    }
  }
}

export default new VendorService();
