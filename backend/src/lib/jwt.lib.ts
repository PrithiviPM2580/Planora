import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import config from "@/config/env.config.js";
import logger from "./logger.lib.js";
import APIError from "./api-error.lib.js";

const jwtSecret: Secret = config.JWT_SECRET;

const jwtSignOptions = {
  expiresIn: config.JWT_EXPIRES_IN,
} as SignOptions;

export const jwtSign = {
  sign: (payload: object, expiresIn?: string) => {
    const options = (
      expiresIn ? { ...jwtSignOptions, expiresIn } : jwtSignOptions
    ) as SignOptions;
    return jwt.sign(payload, jwtSecret, options);
  },
  verify: (token: string): JWTPayload => {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      if (typeof decoded === "string") {
        throw new APIError(400, "Invalid token");
      }
      return decoded as JWTPayload;
    } catch (error) {
      logger.error("JWT verification failed", {
        label: "JWT_Lib",
        error: (error as Error).message,
      });
      throw new APIError(401, "Invalid or expired token");
    }
  },
};
