import { tokenService } from '../core/auth/services/token';
import express from 'express';
import { ApiErrorMessage } from '../utils/error-message';

interface CustomRequest extends express.Request {
  user?: any; // Change 'any' to the type of your 'user' object if known
}

export const authMiddleware = (
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiErrorMessage.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiErrorMessage.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiErrorMessage.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};
