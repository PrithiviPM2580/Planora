import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().int().positive(),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  APP_NAME: z.string(),
  APP_VERSION: z.string(),
  CORS_ORIGIN: z.string(),
});

export type EnvConfig = z.infer<typeof envSchema>;
