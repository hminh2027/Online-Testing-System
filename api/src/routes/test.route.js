const express = require("express");
const { testController } = require("../controllers");

const router = express.Router();

router.route("/").post(testController.createOne);

router.route("/:testId").post(testController.createOneQuestion);

// router.route("/:code").get(userController.getOneById);
// .get("/tests")
// .get("/tests/:testsId");

module.exports = router;
