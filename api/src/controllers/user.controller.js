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

const getOneByEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  let user = await userService.getOneByEmail(email);
  user = omit(user, ["password"]);
  res.status(httpStatus.OK).json({ content: { user } });
});

const updateOneById = catchAsync(async (req, res) => {
  // should be validated before get into the handlers
  // const { email, password, name, avatar_url } = req.body;
  const { id } = req.user;
  let user = await userService.updateOneById(id, req.body);

  user = omit(user, ["password"]);
  res.status(httpStatus.OK).json({
    message: "User updated successfully",
    content: user,
  });
});

// TODO: update password later
const updateOnePasswordByEmail = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.user;
  let user = await userService.updateOneById(id, { ...req.body, password });

  user = omit(user, ["password"]);
  res.status(httpStatus.OK).json({
    message: "User updated successfully",
    content: user,
  });
});

module.exports = {
  getOneByEmail,
  getOneById,
  updateOneById,
  updateOnePasswordByEmail,
};
