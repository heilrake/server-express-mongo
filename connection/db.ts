import { logger } from "../logger";
import mongoose from "mongoose";

export const initDataBase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    logger.ServerDevelopmentLogger.info(
      "🍿 MongoDb Database Connected: successfully",
    );
  } catch (error) {
    logger.ServerDevelopmentLogger.error(
      "MongoDb Database Connected: error",
      error,
    );
    throw error;
  }
};
