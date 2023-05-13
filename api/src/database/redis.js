import config from "../config/config";

const Redis = require("ioredis");

export const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  username: config.redis.username,
  password: config.redis.password,
});
