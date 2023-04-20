class ApiError extends Error {
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;

    stack
      ? (this.stack = stack)
      : Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
