import { tokenService } from "../core/auth/services/token";
import express from "express";
import { ApiErrorMessage } from "../utils/error-message";
import ApiError from "../exeptions/api-error";

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

    const accessToken = authorizationHeader.split(" ")[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    next(ApiError.UnauthorizedError());
  }
};
