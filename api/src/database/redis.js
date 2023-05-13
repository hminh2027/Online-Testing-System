const config = require("../config/config");
const Redis = require("ioredis");

module.exports.redis = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  username: config.redis.username,
  password: config.redis.password,
});
