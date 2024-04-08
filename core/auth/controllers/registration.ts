import { userService } from '../services/user';
import express from 'express';
import HttpStatusCode from 'http-status-codes';
import { verifyEnvironmentServer } from '../../../utils/verify-enviroment';
import { logger } from '../../../logger';
import { validationResult } from 'express-validator';
import { ApiErrorMessage } from '../../../utils/error-message';

const routeName = '/auth/registration';

export const registrationHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { isDevelopment } = verifyEnvironmentServer();
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        ApiErrorMessage.UnprocessableEntity({
          statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
          message: 'UNPROCESSABLE_ENTITY',
        }),
      );
    }

    if (isDevelopment) {
      logger.ServerDevelopmentLogger.info(
        ` REST {"route: ${routeName}, "operation": "post", "producer": "Node Server"} + "was started"`,
      );
    }

    const userData = await userService.registration(email, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
    });

    if (isDevelopment) {
      logger.ServerDevelopmentLogger.info(
        ` REST {"route: ${routeName}, "operation": "post", "producer": "Node Server"} + "was finished successfully"`,
      );
    }

    return res.status(HttpStatusCode.CREATED).json(userData); //need add redirect user
  } catch (error) {
    return next(error);
  }
};
