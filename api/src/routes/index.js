const express = require("express");
const { auth } = require("../middlewares");
const router = express.Router();

const userRouter = require("./user.route");
const authRoute = require("./auth.route");

router.use("/auth", authRoute);
router.use("/user", userRouter);

module.exports = router;
