const { config } = require("../config");
const jwt = require("jsonwebtoken");
const TOKEN = require("../constants/token");
const ApiError = require("../utils");
const httpStatus = require("http-status");

const generateToken = ({ username, type, expiresIn }) => {
  return jwt.sign({ username, type }, config.jwt.secret, { expiresIn });
};

const generateAuthTokens = (user) => {
  const { username } = user;
  return {
    refreshToken: generateRefreshToken(username),
    accessToken: generateRefreshToken(username),
  };
};

const generateRefreshToken = (username) => {
  return generateToken({
    username,
    type: TOKEN.ACCESS_TOKEN,
    expiresIn: config.jwt.rtExpiresIn,
  });
};

const generateAccessToken = (username) => {
  return generateToken({
    username,
    type: TOKEN.ACCESS_TOKEN,
    expiresIn: config.jwt.atExpiresIn,
  });
};

const verifyToken = ({ token, tokenType }) => {
  const decoded = jwt.verify(token, config.jwt.secret);

  if (decoded.type !== tokenType) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Token is invalid! Please login"
    );
  }

  return decoded;
};

module.exports = {
  generateToken,
  generateRefreshToken,
  generateAccessToken,
  verifyToken,
  generateAuthTokens,
};
