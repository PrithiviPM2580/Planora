import type { RegisterInput } from "@/validator/auth.validator.js";
import {
  findUserByEmail,
  createUser,
  createVerification,
} from "@/repositories/auth.repository.js";
import logger from "@/lib/logger.lib.js";
import APIError from "@/lib/api-error.lib.js";
import { jwtSign } from "@/lib/jwt.lib.js";
import { expiresAt, verificationEmailTemplate } from "@/utils/helpers.js";
import sendVerificationEmail from "@/lib/send-email.lib.js";

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

  const verificationToken = jwtSign.sign({
    userId: newUser._id,
    property: "email-verification",
  });

  await createVerification({
    userId: newUser._id,
    token: verificationToken,
    expiresAt: expiresAt(),
  });

  const emailResult = await sendVerificationEmail(
    newUser.email,
    "Verify Your Email",
    verificationEmailTemplate(newUser.fullName, verificationToken),
  );

  if (!emailResult) {
    logger.error("Failed to send verification email", {
      label: "Register_Service",
      email: newUser.email,
    });
    throw new APIError(500, "Registration failed", true, {
      details: [
        {
          field: "email",
          message: "Registration failed: Failed to send verification email",
        },
      ],
    });
  }

  return { user: newUser };
};
