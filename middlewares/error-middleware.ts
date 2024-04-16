import { logger } from "../logger";
import express from "express";
import HttpStatusCode from "http-status-codes";
import ApiError from "../exeptions/api-error";

export const ErrorMiddleware = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  logger.ServerDevelopmentLogger.error(
    `Status code: ${err.status}, Error message: ${err.message}`,
  );

  if (err) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Server internal error" });
};
