const express = require("express");
const { attemptController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .put(auth, attemptController.updateOneOngoing)
  .post(auth, attemptController.createOne);

router.route("/:testCode").get(auth, attemptController.getOneOngoing);

router
  .route("/:testCode/result")
  .get(auth, attemptController.getManyByTestCode);

router
  .route("/:testCode/result/me")
  .get(auth, attemptController.getManyByTestCodeAndUserId);

module.exports = router;
