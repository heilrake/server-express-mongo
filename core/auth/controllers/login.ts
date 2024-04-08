import HttpStatusCode from 'http-status-codes';

import express from 'express';
import { logger } from '../../../logger';
import { verifyEnvironmentServer } from '../../../utils/verify-enviroment';
import { userService } from '../services/user';

const routeName = '/auth/login';

export const loginHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { isDevelopment } = verifyEnvironmentServer();
  try {
    const { email, password } = req.body;

    if (isDevelopment) {
      logger.ServerDevelopmentLogger.info(
        ` REST {"route: ${routeName}, "operation": "post", "producer": "Node Server"} + "was started"`,
      );
    }

    const userData = await userService.login(email, password);

    if (isDevelopment) {
      logger.ServerDevelopmentLogger.info(
        ` REST {"route: ${routeName}, "operation": "post", "producer": "Node Server"} + "was finished successfully"`,
      );
    }

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(HttpStatusCode.OK).json(userData);
  } catch (error) {
    return next(error);
  }
};
