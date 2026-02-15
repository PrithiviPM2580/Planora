import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.config.js";
import config from "./config/env.config.js";
import logger from "./lib/logger.lib.js";

const PORT = config.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server is running in http://localhost:${PORT}`, {
        label: "Server",
      });
    });
  } catch (error) {
    logger.error(`Error starting server: ${error}`);
    process.exit(1);
  }
})();
