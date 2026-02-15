import User from "@/models/user.model.js";
import type { Types } from "mongoose";
import Verification from "@/models/verification.model.js";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const createUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  return User.create(userData);
};

export const createVerification = async (verificationData: {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
}) => {
  return Verification.create(verificationData);
};
