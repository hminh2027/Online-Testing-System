const Joi = require("joi");

const dotenv = require("dotenv");
dotenv.config();

const envVariables = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    APP_PORT: Joi.number().default(8000),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_AT_EXPIRE_IN: Joi.string().required(),
    JWT_RT_EXPIRE_IN: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVariables
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) throw new Error(error.message);

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.APP_PORT,
  database: {
    name: envVars.DATABASE_NAME,
    type: envVars.DATABASE_TYPE,
    host: envVars.DATABASE_HOST,
    port: envVars.DATABASE_PORT,
    user: envVars.DATABASE_USER,
    passwrod: envVars.DATABASE_PASSWORD,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    atExpiresIn: envVars.JWT_AT_EXPIRE_IN,
    rtExpiresIn: envVars.JWT_RT_EXPIRE_IN,
  },
  socket: {
    heartbeat: 5000,
  },
};
