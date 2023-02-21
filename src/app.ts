import express, { Express } from "express";
import "express-async-errors";
import { json } from "body-parser";
import dotenv from "dotenv";

import { errorHandler } from "./middlewares";
import { NotFoundError } from "./errors";
import { playRouter } from "./routes/play";

dotenv.config();

const app: Express = express();
app.set("trust proxy", true);
app.use(json());

app.use("/api/v1", playRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
