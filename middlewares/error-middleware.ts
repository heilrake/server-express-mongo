import { logger } from '../logger';
import express from 'express';
import { ApiErrorMessage } from '../utils/error-message';
import HttpStatusCode from 'http-status-codes';

export const ErrorMiddleware = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (err instanceof ApiErrorMessage) {
    return res.status(err.status).json({ message: err.message });
  }

  logger.ServerDevelopmentLogger.error(`Status code: ${err.status}, Error message: ${err.message}`);
  return res
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .json({ message: 'Server internal error' });
};
