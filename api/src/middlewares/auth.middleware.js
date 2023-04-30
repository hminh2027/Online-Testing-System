const userService = require("../services/user.service");
const TOKEN = require("../constants/token");
const { config } = require("../config");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) throw new Error();

    const decoded = jwt.verify(token, config.jwt.secret);
    if (decoded.type !== TOKEN.ACCESS_TOKEN) throw new Error();

    const user = await userService.getUserByUsername({
      username: decoded.username,
    });
    if (!user) throw new Error();
    req.user = user;

    next();
  } catch (error) {
    next({ ...error, message: "Token invalid" });
  }
};

module.exports = auth;
