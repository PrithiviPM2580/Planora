import {
  loginController,
  registerController,
  resetPasswordController,
  verifyEmailController,
  verifyResetPasswordTokenAndResetPasswordController,
} from "@/controllers/auth.controller.js";
import asyncHandler from "@/middlewares/async-handler.middleware.js";
import { authLimitter } from "@/middlewares/rate-limiter.middleware.js";
import { validateRequest } from "@/middlewares/validate-request.middleware.js";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  verifyResetPasswordTokenAndResetPasswordSchema,
} from "@/validator/auth.validator.js";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.post(
  "/register",
  authLimitter,
  validateRequest({ body: registerSchema }),
  asyncHandler(registerController),
);

authRouter.post(
  "/login",
  authLimitter,
  validateRequest({ body: loginSchema }),
  asyncHandler(loginController),
);

authRouter.post(
  "/verify-email",
  authLimitter,
  validateRequest({ body: verifyEmailSchema }),
  asyncHandler(verifyEmailController),
);

authRouter.post(
  "/reset-password-request",
  authLimitter,
  validateRequest({ body: resetPasswordSchema }),
  asyncHandler(resetPasswordController),
);

authRouter.post(
  "/reset-password",
  authLimitter,
  validateRequest({ body: verifyResetPasswordTokenAndResetPasswordSchema }),
  asyncHandler(verifyResetPasswordTokenAndResetPasswordController),
);
export default authRouter;
