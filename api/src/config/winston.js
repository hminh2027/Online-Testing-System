const winston = require("winston");
const config = require("./config");

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const winstonConfig = {
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message, label, timestamp }) =>
        `${level}: ${label}: ${[timestamp]}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
    new winston.transports.File({
      level: "error",
      filename: "logs/errors.log",
    }),
  ],
};

module.exports = winstonConfig;
