const express = require("express");
const { statisticController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router.route("/exam/:id").get(auth, statisticController.getStatisticByExamId);

// router.route("/class").get(auth, statisticController.getOneById);

module.exports = router;
