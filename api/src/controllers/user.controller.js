const { authService, tokenService, userService } = require("../services");
const { catchAsync } = require("../utils");
const _ = require("lodash");
const httpStatus = require("http-status");

const getOneById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  let user = await userService.getOneById(+userId);
  user = _.omit(user, ["password"]);
  res.status(httpStatus.OK).json({ user });
});

// const getoneByEmail = catchAsync(async (req, res) => {
//   const { email, password } = req.body;
//   let user = await authService.login({ email, password });
//   const tokens = tokenService.generateAuthTokens(user);
//   user = _.omit(user, ["password"]);
//   res
//     .status(httpStatus.CREATED)
//     .cookie("accessToken", tokens.accessToken, {
//       httpOnly: true,
//     })
//     .json({
//       data: "Logged in successfully",
//       user,
//       tokens,
//     });
// });

const updateOneById = catchAsync(async (req, res) => {
  // should be validated before get into the handlers
  // const { email, password, name, avatar_url } = req.body;
  const { id } = req.user;
  let user = await userService.updateOneById(id, req.body);

  user = _.omit(user, ["password"]);
  res.status(httpStatus.OK).json({
    data: "User updated successfully",
    user,
  });
});

module.exports = {
  updateOneById,
  // getoneByEmail,
  getOneById,
};
