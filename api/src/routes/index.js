const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const examRoute = require("./exam.route");
// const attemptRoute = require("./attempt.route");
// const choiceRoute = require("./choice.route");
const classRoute = require("./class.route");
const postRoute = require("./post.route");
const commentRoute = require("./comment.route");
const userClassRoute = require("./userClass.route");
const questionRoute = require("./question.route");
const answerRoute = require("./answer.route");

// const notificationRoute = require("./notification.route");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/class", classRoute);
router.use("/comment", commentRoute);
router.use("/post", postRoute);
router.use("/user_class", userClassRoute);
router.use("/exam", examRoute);
router.use("/exam", examRoute);
router.use("/question", questionRoute);
router.use("/answer", answerRoute);

// router.use("/notification", notificationRoute);

// router.use("/attempt", attemptRoute);
// router.use("/choice", choiceRoute);

module.exports = router;
