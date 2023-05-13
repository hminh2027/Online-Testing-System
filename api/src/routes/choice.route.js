const express = require("express");
const { choiceController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router.route("/").post(auth, choiceController.createOne);

module.exports = router;
