const express = require("express");
const { auth } = require("../middlewares");
const router = express.Router();

const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const testRoute = require("./test.route");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/test", testRoute);

module.exports = router;
