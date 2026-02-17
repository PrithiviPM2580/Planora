import {
  loginController,
  registerController,
  verifyEmailController,
} from "@/controllers/auth.controller.js";
import asyncHandler from "@/middlewares/async-handler.middleware.js";
import { authLimitter } from "@/middlewares/rate-limiter.middleware.js";
import { validateRequest } from "@/middlewares/validate-request.middleware.js";
import {
  loginSchema,
  registerSchema,
  verifyEmailSchema,
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

export default authRouter;
