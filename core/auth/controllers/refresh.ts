import { logger } from '../../../logger';
import express from 'express';
import HttpStatusCode from 'http-status-codes';
import { verifyEnvironmentServer } from '../../../utils/verify-enviroment';
import { userService } from '../services/user';

const routeName = '/auth/refresh';

export const refreshHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { isDevelopment } = verifyEnvironmentServer();
  try {
    const { refreshToken } = req.cookies;

    if (isDevelopment) {
      logger.ServerDevelopmentLogger.info(
        ` REST {"route: ${routeName}, "operation": "get", "producer": "Node Server"} + "was started"`,
      );
    }

    const userData = await userService.refresh(refreshToken);

    if (isDevelopment) {
      logger.ServerDevelopmentLogger.info(
        ` REST {"route: ${routeName}, "operation": "get", "producer": "Node Server"} + "was finished successfully"`,
      );
    }

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(HttpStatusCode.OK).json(userData);
  } catch (error) {
    return next(error);
  }
};
