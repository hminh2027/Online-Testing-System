const { authService, tokenService } = require("../services");
const { catchAsync } = require("../utils");
const _ = require("lodash");
const httpStatus = require("http-status");

const register = catchAsync(async (req, res) => {
  let user = await authService.signup(req.body);
  const tokens = tokenService.generateAuthTokens(user);
  user = _.omit(user, ["password"]);
  res
    .status(httpStatus.CREATED)
    .cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
    })
    .json({
      data: "Registered in successfully",
      user,
      tokens,
    });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  let user = await authService.login({ email, password });
  const tokens = tokenService.generateAuthTokens(user);
  user = _.omit(user, ["password"]);
  res
    .status(httpStatus.CREATED)
    .cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
    })
    .json({
      data: "Logged in successfully",
      user,
      tokens,
    });
});

module.exports = {
  register,
  login,
};
