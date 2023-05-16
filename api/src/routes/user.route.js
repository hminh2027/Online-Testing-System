const express = require("express");
const { userController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router.route("/").put(auth, userController.updateOneById);
router.route("/:userId").get(userController.getOneById);

module.exports = router;
