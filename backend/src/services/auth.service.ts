import type {
  LoginInput,
  RegisterInput,
  VerifyEmailInput,
} from "@/validator/auth.validator.js";
import {
  findUserByEmail,
  createUser,
  createVerification,
  findVerificationByToken,
  findUserById,
  deleteVerificationById,
  findVerificationByUserId,
} from "@/repositories/auth.repository.js";
import logger from "@/lib/logger.lib.js";
import APIError from "@/lib/api-error.lib.js";
import { jwtSign } from "@/lib/jwt.lib.js";
import {
  expiresAt,
  stringToObjectId,
  verificationEmailTemplate,
} from "@/utils/helpers.js";
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
    purpose: "email-verification",
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

export const loginService = async (data: LoginInput) => {
  const { email, password } = data;

  const user = await findUserByEmail(email);

  if (!user) {
    logger.error("Invalid email or password", {
      label: "Login_Service",
      email,
    });
    throw new APIError(400, "Invalid email or password");
  }

  if (!user.isEmailVerified) {
    const existingVerification = await findVerificationByUserId(user._id);

    if (existingVerification && existingVerification?.expiresAt < new Date()) {
      logger.error(
        "Existing verification token expired, generating new token",
        {
          label: "Login_Service",
          email,
        },
      );

      throw new APIError(
        400,
        "Email not verified, existing verification token expired, please check your email for new verification link",
      );
    } else {
      if (existingVerification) {
        await deleteVerificationById(existingVerification._id);
      }

      const verificationToken = jwtSign.sign({
        userId: user._id,
        purpose: "email-verification",
      });

      await createVerification({
        userId: user._id,
        token: verificationToken,
        expiresAt: expiresAt(),
      });

      const emailResult = await sendVerificationEmail(
        user.email,
        "Verify Your Email",
        verificationEmailTemplate(user.fullName, verificationToken),
      );

      if (!emailResult) {
        logger.error("Failed to send verification email", {
          label: "Register_Service",
          email: user.email,
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
    }
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    logger.error("Invalid email or password", {
      label: "Login_Service",
      email,
    });
    throw new APIError(400, "Invalid email or password");
  }

  const token = jwtSign.sign(
    {
      userId: user._id,
      purpose: "login",
    },
    "7d",
  );

  user.lastLogin = new Date();
  await user.save();

  return { user, token };
};

export const verifyEmailService = async (data: VerifyEmailInput) => {
  const { token } = data;

  const payload = jwtSign.verify(token);

  const { userId, purpose } = payload;

  if (purpose !== "email-verification") {
    logger.error("Invalid token purpose", {
      label: "Verify_Email_Service",
      token,
    });
    throw new APIError(400, "Invalid token");
  }

  const userObjectId = stringToObjectId(userId);
  const verification = await findVerificationByToken(userObjectId, token);

  if (!verification) {
    logger.error("Verification token not found", {
      label: "Verify_Email_Service",
      token,
    });
    throw new APIError(400, "Invalid or expired token");
  }

  const isTokenExpired = verification.expiresAt < new Date();

  if (isTokenExpired) {
    logger.error("Verification token expired", {
      label: "Verify_Email_Service",
      token,
    });
    throw new APIError(400, "Invalid or expired token");
  }

  const user = await findUserById(verification.userId);

  if (!user) {
    logger.error("User not found for verification", {
      label: "Verify_Email_Service",
      userId: verification.userId,
    });
    throw new APIError(400, "User not found");
  }

  if (user.isEmailVerified) {
    logger.error("Email already verified", {
      label: "Verify_Email_Service",
      userId: verification.userId,
    });
    throw new APIError(400, "Email already verified");
  }

  user.isEmailVerified = true;
  await user.save();

  await deleteVerificationById(verification._id);
};
