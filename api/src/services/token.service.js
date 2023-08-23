const { config } = require("../config");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils");
const httpStatus = require("http-status");
const { TOKEN } = require("../constants");

const generateToken = ({ id, type, expiresIn }) => {
  return jwt.sign({ id, type }, config.jwt.secret, { expiresIn });
};

const generateAuthTokens = (user) => {
  const { id } = user;
  return {
    refreshToken: generateRefreshToken(id),
    accessToken: generateAccessToken(id),
  };
};

const generateRefreshToken = (id) => {
  return generateToken({
    id,
    type: TOKEN.REFRESH_TOKEN,
    expiresIn: config.jwt.rtExpiresIn,
  });
};

const generateAccessToken = (id) => {
  return generateToken({
    id,
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
