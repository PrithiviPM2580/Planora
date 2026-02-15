import type { RegisterInput } from "@/validator/auth.validator.js";
import { findUserByEmail, createUser } from "@/repositories/auth.repository.js";
import logger from "@/lib/logger.lib.js";
import APIError from "@/lib/api-error.lib.js";

export const registerService = async (userData: RegisterInput) => {
  const { fullName, email, password } = userData;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    logger.error("Email already in use", { label: "Register_Service", email });
    throw new APIError(400, "Registration failed", true, {
      details: [
        {
          field: "email",
          message: "Registration failed: Email already in use",
        },
      ],
    });
  }

  const newUser = await createUser({ fullName, email, password });

  return { user: newUser };
};
