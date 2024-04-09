import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { appRouter } from "./router";
import { logger } from "./logger";
import { initDataBase } from "./connection/db";
import { ErrorMiddleware } from "./middlewares/error-middleware";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";

import { typeDefs, resolvers } from "./graphql";

dotenv.config();
const app = express();

const bootstrapServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  await initDataBase();
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );

  app.use("/api", appRouter);
  app.use("/graphql", expressMiddleware(server));
  app.use(ErrorMiddleware);

  try {
    app.listen(process.env.PORT || 5001, () => {
      logger.ServerDevelopmentLogger.info(
        `🚀 ExpressApp ready at http://localhost:${process.env.PORT} 
        🚀 Graphql ready at http://localhost:${process.env.PORT}/graphql`,
      );
    });
  } catch (error) {
    logger.ServerDevelopmentLogger.error("Server app error:", error);
  }
};

bootstrapServer();
