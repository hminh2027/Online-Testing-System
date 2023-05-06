const express = require("express");
const { authController } = require("../controllers");
const { validation } = require("../middlewares/validation.middleware");
const { signup, login } = require("../validations");
const { auth } = require("../middlewares");

const router = express.Router();

router
  .get("/me", auth, authController.getMe)
  .post("/signup", validation(signup), authController.signup)
  .post("/login", validation(login), authController.login);

module.exports = router;
