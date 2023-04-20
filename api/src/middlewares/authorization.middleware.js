const httpStatus = require("http-status");
const ACTION = require("../constants/action");
const PERMISSIONS = require("../constants/permission");
const ApiError = require("../utils/apiError");

const authorization = (permission) => (req, res, next) => {
  const userRole = req.user.employee.jobTitle;
  const [resource, action] = permission.split(":");
  const fullAccessPermission = `${resource}:${ACTION.ALL}`;

  for (const item of PERMISSIONS)
    if (
      item.name === userRole &&
      (item.permissions.includes(permission) ||
        item.permissions.includes(fullAccessPermission))
    )
      return next();

  throw new ApiError(
    httpStatus.FORBIDDEN,
    "You are not authorized to perform this action!"
  );
};

module.exports = authorization;
