const userService = require("./user.service");
const passwordService = require("./password.service");
const { ApiError } = require("../utils");
const httpStatus = require("http-status");

const login = async ({ email, password }) => {
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

const signup = async ({
  password,
  fullname,
  email,
  isTeacher,
  studentId,
  phone,
  birth,
  school,
}) => {
  const isExisted = await userService.getOneByEmail({ email });
  if (isExisted) throw new ApiError(httpStatus.CONFLICT, "Email đã tồn tại");
  password = await passwordService.hashPassword(password);
  const user = await userService.createOne({
    password,
    fullname,
    email,
    isTeacher,
    studentId,
    phone,
    birth,
    school,
  });
  return user;
};

module.exports = {
  login,
  signup,
};
