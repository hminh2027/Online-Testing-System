const userService = require("./user.service");
const passwordService = require("./password.service");
const { ApiError } = require("../utils");
const httpStatus = require("http-status");

const login = async ({ email, password }) => {
  console.log("ok");
  const user = await userService.getOneByEmail({
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
  const isExisted = await userService.getOneByEmail({ email });
  if (isExisted) throw new ApiError(httpStatus.BAD_REQUEST, "Email đã tồn tại");
  password = await passwordService.hashPassword(password);
  const user = await userService.createOne({
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
