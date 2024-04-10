import { logger } from "../../../logger";
import express from "express";
import HttpStatusCode from "http-status-codes";
import { verifyEnvironmentServer } from "../../../utils/verify-enviroment";
import { userService } from "../services/user";

const routeName = "/auth/logout";

export const logoutHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { isDevelopment } = verifyEnvironmentServer();
  try {
    const { refreshToken } = req.cookies;

    if (isDevelopment) {
      logger.ServerDevelopmentLogger.info(
        ` REST {"route: ${routeName}, "operation": "post", "producer": "Node Server"} + "was started"`,
      );
    }
    await userService.logout(refreshToken);

    if (isDevelopment) {
      logger.ServerDevelopmentLogger.info(
        ` REST {"route: ${routeName}, "operation": "post", "producer": "Node Server"} + "was finished successfully"`,
      );
    }

    res.clearCookie("refreshToken");
    return res.status(HttpStatusCode.OK).json({});
  } catch (error) {
    return next(error);
  }
};
