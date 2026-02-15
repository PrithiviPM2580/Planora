import validate from "@/lib/validate.lib.js";
import { envSchema } from "@/validator/env.validator.js";

const envConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  APP_NAME: process.env.APP_NAME,
  APP_VERSION: process.env.APP_VERSION,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};

const config = validate(envSchema, envConfig);

export default config;
