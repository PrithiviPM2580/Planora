import User from "@/models/user.model.js";

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
