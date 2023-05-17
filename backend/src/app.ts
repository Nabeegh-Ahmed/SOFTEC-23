require("dotenv").config();
import cookieParser from "cookie-parser";
import path from "path";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import config from "config";
import cors from "cors";
import connectDB from "./config/db/mongo.db";
import appRouter from "./routes";
import Logger from "./utils/logger.util";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// route for static files
app.use("/api/static", express.static(path.join(__dirname, "../public")));

// Development logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// CORS
app.use(
  cors({
    credentials: true, // allow cookies to be sent to and from the server
    origin: [config.get<string>("origin")],
  })
);


// routes for api
app.use("/api", appRouter);


// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = config.get<number>("port");
app.listen(port, () => {
  try {
    Logger.log(`Server started on port: ${port}`);
    connectDB();
  } catch (error) {
    Logger.error(error);
  }
});
