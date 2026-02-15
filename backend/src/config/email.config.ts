import { SMTPClient } from "emailjs";
import config from "./env.config.js";

const emailConfig = new SMTPClient({
  user: config.EMAIL_USER,
  password: config.EMAIL_PASSWORD,
  host: config.EMAIL_HOST,
  ssl: true,
});

export default emailConfig;
