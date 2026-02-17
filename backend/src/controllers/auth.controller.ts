import logger from "@/lib/logger.lib.js";
import { successResponse } from "@/utils/success-response.util.js";
import type { Request, Response } from "express";
import {
  registerService,
  loginService,
  verifyEmailService,
  resetPasswordService,
  verifyResetPasswordTokenAndResetPasswordService,
} from "@/services/auth.service.js";

export const registerController = async (req: Request, res: Response) => {
  const { user } = await registerService(req.body);

  logger.info("User registered successfully", {
    label: "Register_Controller",
    userId: user.id,
  });

  successResponse(
    res,
    201,
    "User registered successfully, Verification email sent please check and verify your account",
    { user },
  );
};

export const loginController = async (req: Request, res: Response) => {
  const { user, token } = await loginService(req.body);

  logger.info("User logged in successfully", {
    label: "Login_Controller",
    userId: user.id,
  });

  successResponse(res, 200, "User logged in successfully", { user, token });
};

export const verifyEmailController = async (req: Request, res: Response) => {
  await verifyEmailService(req.body);

  logger.info("Email verified successfully", {
    label: "Verify_Email_Controller",
  });

  successResponse(
    res,
    200,
    "Email verified successfully, you can now login to your account",
  );
};

export const resetPasswordController = async (req: Request, res: Response) => {
  await resetPasswordService(req.body);

  logger.info("Password reset email sent successfully", {
    label: "Reset_Password_Controller",
    email: req.body.email,
  });

  successResponse(
    res,
    200,
    "Password reset email sent successfully, please check your inbox",
  );
};

export const verifyResetPasswordTokenAndResetPasswordController = async (
  req: Request,
  res: Response,
) => {
  await verifyResetPasswordTokenAndResetPasswordService(req.body);

  logger.info("Password reset successfully", {
    label: "Verify_Reset_Password_Token_And_Reset_Password_Controller",
  });

  successResponse(res, 200, "Password reset successfully, you can now login");
};
