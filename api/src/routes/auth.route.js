const express = require("express");
const { authController } = require("../controllers");
const { validation } = require("../middlewares/validation.middleware");
const { register, login } = require("../validations");
const router = express.Router();

router
  .post("/register", validation(register), authController.register)
  .post("/login", validation(login), authController.login);

module.exports = router;
