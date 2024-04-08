import HttpStatusCode from 'http-status-codes';
import express from 'express';
import { verifyEnvironmentServer } from '../../../utils/verify-enviroment';
import { userService } from '../../auth/services/user';
import { logger } from '../../../logger';

const routeName = '/profile';

export const getProfileHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { isDevelopment } = verifyEnvironmentServer();

  try {
    if (isDevelopment) {
      logger.ServerDevelopmentLogger.info(
        ` REST {"route: ${routeName}, "operation": "get", "producer": "Node Server"} + "was started"`,
      );
    }
    const user = await userService.getProfile();

    if (isDevelopment) {
      logger.ServerDevelopmentLogger.info(
        ` REST {"route: ${routeName}, "operation": "get", "producer": "Node Server"} + "was finished successfully"`,
      );
    }

    return res.status(HttpStatusCode.OK).json(user);
  } catch (error) {
    return next(error);
  }
};
