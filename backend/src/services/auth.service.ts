import userRepository from "../repositories/user.repository";
import { RegisterDTO, LoginDTO } from "../validators/auth.validator";
import { encrypt } from "../utils/encryption.util";
import { generateToken } from "../utils/jwt.util";
import { Types } from "mongoose";

interface MongoError extends Error {
  code?: number;
}

export class AuthService {
  async register(data: RegisterDTO) {
    const { fullName, email, password, role, companyName, vendorName } = data;

    try {
      const user = await userRepository.create({
        fullName,
        email,
        password,
        role,
        companyName,
        vendorName,
      });

      return user;
    } catch (error: unknown) {
      const err = error as MongoError;
      if (err.code === 11000) {
        throw new Error("Account is already registered");
      }
      throw error;
    }
  }

  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await userRepository.findByIdentifier(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = encrypt(password) === user.password;

    if (!isPasswordValid) {
      throw new Error("User not found");
    }

    const token = generateToken({
      id: user._id as Types.ObjectId,
      role: user.role,
    });

    return token;
  }

  async getProfile(userId: string | Types.ObjectId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export default new AuthService();
