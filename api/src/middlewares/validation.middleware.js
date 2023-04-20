const Joi = require("joi");
const _ = require("lodash");

const validation = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ["body", "query", "params"]);
  const object = _.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new Error(errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = {
  validation,
};
