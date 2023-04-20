const Joi = require("joi");
const ROLE = require("../constants/role");

const createEmployee = {
  body: Joi.object().keys({
    employeeNumber: Joi.number().positive().required(),
    lastName: Joi.string().min(3).max(50).required(),
    firstName: Joi.string().min(3).max(50).required(),
    extension: Joi.string().max(50).required(),
    email: Joi.string().email().min(10).max(100).required(),
    officeCode: Joi.string().max(10).required(),
    reportsTo: Joi.number().positive().optional(),
    jobTitle: Joi.allow(Object.values(ROLE)).required(),
  }),
};

const updateEmployee = {
  params: Joi.object().keys({
    number: Joi.number().required(),
  }),
  body: Joi.object().keys({
    employeeNumber: Joi.any()
      .forbidden()
      .messages({ "any.unknown": "employeeNumber should not be changed." }),
    lastName: any()
      .forbidden()
      .messages({ "any.unknown": "lastName should not be changed." }),
    firstName: any()
      .forbidden()
      .messages({ "any.unknown": "firstName should not be changed." }),
    extension: Joi.string().max(50).required(),
    email: Joi.string().email().min(10).max(100).required(),
    officeCode: Joi.string().max(10).required(),
    reportsTo: Joi.number().positive().optional(),
    jobTitle: Joi.allow(Object.values(ROLE)).required(),
  }),
};

module.exports = {
  updateEmployee,
  createEmployee,
};
