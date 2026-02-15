import morgan from "morgan";
import logger from "@/lib/logger.lib.js";

export const morganLogger = morgan("combined", {
  stream: {
    write: (message: string) => {
      logger.info(message.trim(), { label: "HTTP" });
    },
  },
});
