import logger from "@/lib/logger.lib.js";
import { successResponse } from "@/utils/success-response.util.js";
import type { Request, Response } from "express";
import { registerService } from "@/services/auth.service.js";

export const registerController = async (req: Request, res: Response) => {
  const { user } = await registerService(req.body);

  logger.info("User registered successfully", {
    label: "Register_Controller",
    userId: user.id,
  });

  successResponse(res, 201, "User registered successfully", { user });
};
