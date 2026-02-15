import config from "@/config/env.config.js";

export const corsOptions = {
  origin: config.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  optionsSuccessStatus: 200,
  credentials: true,
};
