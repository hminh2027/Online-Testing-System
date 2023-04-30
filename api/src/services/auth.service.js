const userService = require("./user.service");
const passwordService = require("./password.service");
const { ApiError } = require("../utils");
const httpStatus = require("http-status");

const login = async ({ email, password }) => {
  const user = await userService.getUserByEmail({
    email,
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

const signup = async ({ password, name, email }) => {
  password = await passwordService.hashPassword(password);
  const user = await userService.createUser({
    password,
    name,
    email,
  });
  return user;
};

module.exports = {
  login,
  signup,
};
