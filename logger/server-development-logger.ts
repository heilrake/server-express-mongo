import winston from "winston";

export const ServerDevelopmentLogger: winston.Logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
});
