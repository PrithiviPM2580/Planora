import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { corsOptions } from "@/utils/cors.util.js";
import { morganLogger } from "./utils/morgan.util.js";
import globalErrorHandler from "@/middlewares/global-error-handler.middleware.js";

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morganLogger);

app.use(globalErrorHandler);

export default app;
