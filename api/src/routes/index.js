const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const examRoute = require("./exam.route");
const attemptRoute = require("./attempt.route");
const choiceRoute = require("./choice.route");
const classRoute = require("./class.route");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/exam", examRoute);
router.use("/attempt", attemptRoute);
router.use("/choice", choiceRoute);
router.use("/class", classRoute);

module.exports = router;
