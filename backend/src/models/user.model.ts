import mongoose, { Types } from "mongoose";
import { encrypt } from "../utils/encryption.util";
import { ROLES } from "../constants";

export interface IUser {
  _id?: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  role: string;
  companyName?: string;
  vendorName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.HR, ROLES.VENDOR],
      default: ROLES.VENDOR,
    },
    companyName: {
      type: String,
      required: function (this: IUser) {
        return this.role === ROLES.HR;
      },
      default: null,
    },
    vendorName: {
      type: String,
      required: function (this: IUser) {
        return this.role === ROLES.VENDOR;
      },
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this as any;
  if (user.isModified("password")) {
    user.password = encrypt(user.password);
  }
  next();
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
