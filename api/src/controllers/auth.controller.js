const { authService, tokenService, userService } = require("../services");
const { catchAsync } = require("../utils");
const omit = require("lodash/omit");
const httpStatus = require("http-status");

const signup = catchAsync(async (req, res) => {
  let user = await authService.signup(req.body);
  const tokens = tokenService.generateAuthTokens(user);
  user = omit(user, ["password"]);
  res
    .status(httpStatus.OK)
    .cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
    })
    .json({
      message: "Đăng ký thành công",
      content: { user, tokens },
    });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  let user = await authService.login({ email, password });
  const tokens = tokenService.generateAuthTokens(user);
  user = _.omit(user, ["password"]);
  res
    .status(httpStatus.OK)
    .cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
    })
    .json({
      message: "Đăng nhập thành công",
      content: { user, tokens },
    });
});

const getMe = catchAsync(async (req, res) => {
  const { id } = req.user;
  const user = await userService.getOneById(id);
  res.status(httpStatus.OK).json({
    content: user,
  });
});

module.exports = {
  signup,
  login,
  getMe,
};
