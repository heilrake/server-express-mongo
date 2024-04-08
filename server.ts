import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { appRouter } from './router';
import { logger } from './logger';
import { initDataBase } from './connection/db';
import { ErrorMiddleware } from './middlewares/error-middleware';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use('/api', appRouter);

app.use(ErrorMiddleware);

const start = async () => {
  try {
    await initDataBase();
    app.listen(process.env.PORT || 5001, () => {
      logger.ServerDevelopmentLogger.info(
        `🚀 ExpressApp ready at http://localhost:${process.env.PORT}`,
      );
    });
  } catch (error) {
    logger.ServerDevelopmentLogger.error('Server app error:', error);
  }
};

start();
