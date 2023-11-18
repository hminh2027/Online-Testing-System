const express = require("express");
const { choiceController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router.route("/").post(auth, choiceController.createOne);
router.route("/many").post(auth, choiceController.updateMany);

module.exports = router;
