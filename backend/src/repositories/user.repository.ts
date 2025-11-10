import UserModel, { IUser } from "../models/user.model";
import { Types } from "mongoose";

export class UserRepository {
  async findByIdentifier(identifier: string): Promise<IUser | null> {
    return UserModel.findOne({
      $or: [{ email: identifier }],
    });
  }

  async findById(id: string | Types.ObjectId): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    return UserModel.create(userData);
  }

  async updateById(
    id: string | Types.ObjectId,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }
}

export default new UserRepository();
