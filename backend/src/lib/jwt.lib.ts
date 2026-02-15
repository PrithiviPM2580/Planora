import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import config from "@/config/env.config.js";

const jwtSecret: Secret = config.JWT_SECRET;

const jwtSignOptions = {
  expiresIn: config.JWT_EXPIRES_IN,
} as SignOptions;

export const jwtSign = {
  sign: (payload: object) => {
    return jwt.sign(payload, jwtSecret, jwtSignOptions);
  },
};
