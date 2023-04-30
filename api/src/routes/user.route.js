const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.route("/").put(userController.updateOneById);

router.route("/:userId").get(userController.getOneById);
// .get("/tests")
// .get("/tests/:testsId");

module.exports = router;
