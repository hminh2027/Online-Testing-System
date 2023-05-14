const TOKEN = require("../constants/token");
const { config } = require("../config");
const jwt = require("jsonwebtoken");
const { userService } = require("../services");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if (!token) throw new Error();

    const decoded = jwt.verify(token, config.jwt.secret);
    if (decoded.type !== TOKEN.REFRESH_TOKEN) throw new Error();

    const user = await userService.getOneById(decoded.id);
    if (!user) throw new Error();
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    next({ ...error, message: "Token invalid" });
  }
};

module.exports = auth;
