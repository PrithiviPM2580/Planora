import logger from "@/lib/logger.lib.js";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI!;
    await mongoose.connect(mongoURI);
    logger.info("Successfully connected to MongoDB", { label: "DB_CONFIG" });
  } catch (error) {
    logger.error("Failed to connect to MongoDB", { label: "DB_CONFIG", error });
    process.exit(1); // Exit the process with failure
  }
};
