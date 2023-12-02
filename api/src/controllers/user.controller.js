const { omit } = require("lodash");
const { authService, tokenService, userService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const getOneById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  let user = await userService.getOneById(+userId);
  user = omit(user, ["password"]);
  res.status(httpStatus.OK).json({ content: { user } });
});

const getStudents = catchAsync(async (req, res) => {
  let users = await userService.getManyStudent();
  res.status(httpStatus.OK).json({ content: users });
});

const getOneByEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  let user = await userService.getOneByEmail(email);
  user = omit(user, ["password"]);
  res.status(httpStatus.OK).json({ content: { user } });
});

const patchOneById = catchAsync(async (req, res) => {
  const { id } = req.user;
  let user = await userService.patchOneById(id, req.body);

  res.status(httpStatus.OK).json({
    message: "Cập nhật thông tin thành công",
    content: user,
  });
});

module.exports = {
  getOneByEmail,
  getStudents,
  getOneById,
  patchOneById,
};
