const express = require("express");
const { answerController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router.route("/:id").delete(auth, answerController.deleteOneById);

module.exports = router;
