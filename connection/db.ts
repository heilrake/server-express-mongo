import { logger } from '../logger';
import mongoose from 'mongoose';

export const initDataBase = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://spemisp40:74h2qp5xxTZXVKLZ@jwt-auth.r0wcqlp.mongodb.net/',
    );
    logger.ServerDevelopmentLogger.info('MongoDb Database Connected: successfully');
  } catch (error) {
    logger.ServerDevelopmentLogger.error('MongoDb Database Connected: error', error);
    throw error;
  }
};
