const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const testRoute = require("./test.route");
const attemptRoute = require("./attempt.route");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/test", testRoute);
router.use("/attempt", attemptRoute);

module.exports = router;
