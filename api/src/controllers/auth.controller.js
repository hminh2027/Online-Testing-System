const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");
const catchAsync = require("../utils/catchAsync");
const _ = require("lodash");

const register = catchAsync(async (req, res) => {
  let user = await authService.signup(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  user = _.omit(user, ["password"]);
  res
    .status(200)
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
  const { username, password } = req.body;
  let user = await authService.login({ username, password });
  const tokens = await tokenService.generateAuthTokens(user);
  user = _.omit(user, ["password"]);
  res
    .status(200)
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
