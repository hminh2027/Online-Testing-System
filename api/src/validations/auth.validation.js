const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(100).required().custom(password),
    employeeNumber: Joi.number().positive().required(),
  }),
};

module.exports = {
  register,
};
