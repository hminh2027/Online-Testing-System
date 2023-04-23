const express = require("express");
const authController = require("./auth.controller");
const { validation } = require("../middlewares/validation.middleware");
const { register } = require("../validations/auth.validation");
const router = express.Router();

router
  .post("/register", validation(register), authController.register)
  .post("/login", authController.login);

module.exports = router;
