const { config } = require("../config");
const jwt = require("jsonwebtoken");
const TOKEN = require("../constants/token");
const ApiError = require("../utils");
const httpStatus = require("http-status");

const generateToken = ({ name, type, expiresIn }) => {
  return jwt.sign({ name, type }, config.jwt.secret, { expiresIn });
};

const generateAuthTokens = (user) => {
  const { name } = user;
  return {
    refreshToken: generateRefreshToken(name),
    accessToken: generateRefreshToken(name),
  };
};

const generateRefreshToken = (name) => {
  return generateToken({
    name,
    type: TOKEN.ACCESS_TOKEN,
    expiresIn: config.jwt.rtExpiresIn,
  });
};

const generateAccessToken = (name) => {
  return generateToken({
    name,
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
