const winston = require("winston");
const winstonConfig = require("../config/winston");

const logger = new winston.createLogger(winstonConfig);

module.exports = logger;
