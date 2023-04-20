const userService = require("./user.service");
const passwordService = require("./password.service");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

const login = async ({ username, password }) => {
  const user = await userService.getUserByUsername({
    username,
  });
  if (!user)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Sai tên đăng nhập hoặc mật khẩu"
    );

  const check = await passwordService.comparePassword(password, user.password);
  if (!check)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Sai tên đăng nhập hoặc mật khẩu"
    );
  return user;
};

const signup = async ({ password, username, employeeNumber }) => {
  password = await passwordService.hashPassword(password);
  const user = await userService.createUser({
    password,
    username,
    employeeNumber,
  });
  return user;
};

module.exports = {
  login,
  signup,
};
