const Joi = require("joi");

const createCustomer = {
  body: Joi.object().keys({
    customerNumber: Joi.number().positive().required(),
    customerName: Joi.string().min(5).max(50).required(),
    contactLastName: Joi.string().min(3).max(50).required(),
    contactFirstName: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(8).max(20).required(),
    addressLine1: Joi.string().min(10).max(50).required(),
    addressLine2: Joi.string().min(10).max(50).optional(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).optional(),
    postalCode: Joi.string().min(5).max(15).optional(),
    country: Joi.string().min(2).max(50).required(),
    salesRepEmployeeNumber: Joi.number().positive().required(),
    creditLimit: Joi.number().less(100000000000).precision(2).optional(),
  }),
};

const updateCustomer = {
  params: Joi.object().keys({
    number: Joi.number().required(),
  }),
  body: Joi.object().keys({
    customerNumber: Joi.any()
      .forbidden()
      .messages({ "any.unknown": "customerNumber should not be changed." }),
    customerName: Joi.string().min(5).max(50).required(),
    contactLastName: Joi.string().min(3).max(50).required(),
    contactFirstName: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(8).max(20).required(),
    addressLine1: Joi.string().min(10).max(50).required(),
    addressLine2: Joi.string().min(10).max(50).optional(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).optional(),
    postalCode: Joi.string().min(5).max(15).optional(),
    country: Joi.string().min(2).max(50).required(),
    salesRepEmployeeNumber: Joi.number().positive().required(),
    creditLimit: Joi.number().less(100000000000).precision(2).optional(),
  }),
};

module.exports = {
  updateCustomer,
  createCustomer,
};
