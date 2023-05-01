const express = require("express");
const { authController } = require("../controllers");
const { validation } = require("../middlewares/validation.middleware");
const { signup, login } = require("../validations");
const router = express.Router();

router
  .post("/signup", validation(signup), authController.signup)
  .post("/login", validation(login), authController.login);

module.exports = router;
