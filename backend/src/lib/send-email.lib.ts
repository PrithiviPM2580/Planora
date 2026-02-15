import emailConfig from "@/config/email.config.js";
import APIError from "./api-error.lib.js";
import logger from "./logger.lib.js";
import config from "@/config/env.config.js";

async function sendVerificationEmail(
  to: string,
  subject: string,
  html: string,
) {
  try {
    const message = await emailConfig.sendAsync({
      from: config.EMAIL_USER,
      to,
      subject,
      attachment: [
        { data: html, alternative: true, "content-type": "text/html" },
      ],
    });
    logger.info("Verification email sent successfully", {
      label: "SendEmailLib",
      to,
      message,
    });

    return message;
  } catch (error) {
    logger.error("Error sending verification email", {
      label: "SendEmailLib",
      error,
    });
    throw new APIError(500, "Failed to send verification email", true, {
      details: [
        { field: "email", message: "Failed to send verification email" },
      ],
    });
  } finally {
    emailConfig.smtp.close();
  }
}

export default sendVerificationEmail;
