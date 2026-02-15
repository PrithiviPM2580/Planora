import { registerController } from "@/controllers/auth.controller.js";
import asyncHandler from "@/middlewares/async-handler.middleware.js";
import { authLimitter } from "@/middlewares/rate-limiter.middleware.js";
import { validateRequest } from "@/middlewares/validate-request.middleware.js";
import { registerSchema } from "@/validator/auth.validator.js";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.post(
  "/register",
  authLimitter,
  validateRequest({ body: registerSchema }),
  asyncHandler(registerController),
);

export default authRouter;
