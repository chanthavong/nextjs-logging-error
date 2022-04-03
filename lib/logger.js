import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const getLogger = (fileName = "log") => {
  const fileLogger = new transports.DailyRotateFile({
    filename: `logs/${fileName}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  });

  const consoleLogger = new transports.Console({
    level: process.env.LOG_LEVEL,
    handleExceptions: false,
    json: false,
    colorize: true,
    format: format.printf((i) => `${i.message}`),
  });

  const logger = createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.printf(
        ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}`
      )
    ),
    defaultMeta: { service: "logger" },
    transports: [ consoleLogger],
  });

  logger.add(fileLogger);
  return logger;
};


export default getLogger();