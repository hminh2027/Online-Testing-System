const httpStatus = require("http-status");
const { config, logger } = require("../config");
const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send({
    code: statusCode,
    message,
  });
};

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

module.exports = { errorHandler, errorConverter };
