const Joi = require("joi");

const signup = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  }),
};

module.exports = {
  signup,
  login,
};
