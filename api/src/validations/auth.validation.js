const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(100).required(),
    email: Joi.string().email().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    password: Joi.string().min(6).max(100).required(),
    email: Joi.string().email().required(),
  }),
};

module.exports = {
  register,
  login,
};
