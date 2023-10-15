const { config } = require("../config");
const jwt = require("jsonwebtoken");
const { userService } = require("../services");
const { TOKEN } = require("../constants");

const auth = async (req, res, next) => {
  try {
    console.log(config.isAuth);
    if (!config.isAuth) {
      req.user = {
        id: 1,
        email: "teacher@gmail.com",
        username: "Minh Mẫn",
        password: "123456",
        is_teacher: true,
        phone: "123456789",
      };
      next();
      return;
    }
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
