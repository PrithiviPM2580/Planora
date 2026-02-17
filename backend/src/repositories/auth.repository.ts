import User from "@/models/user.model.js";
import type { Types } from "mongoose";
import Verification from "@/models/verification.model.js";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email }).select("+password");
};

export const findUserById = async (id: Types.ObjectId) => {
  return User.findById(id);
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

export const findVerificationByToken = async (
  userId: Types.ObjectId,
  token: string,
) => {
  return Verification.findOne({ userId, token });
};

export const deleteVerificationById = async (id: Types.ObjectId) => {
  return Verification.findByIdAndDelete(id);
};

export const findVerificationByUserId = async (userId: Types.ObjectId) => {
  return Verification.findOne({ userId });
};
