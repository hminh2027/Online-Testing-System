const express = require("express");
const { attemptController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(auth, attemptController.getOneOngoing)

  .post(auth, attemptController.createOne);

router
  .route("/:id")
  .put(auth, attemptController.updateOneOngoing)
  .patch(auth, attemptController.patchOneOnGoing);

// router
//   .route("/:testCode/result")
//   .get(auth, attemptController.getManyByTestCode);

// router
//   .route("/:testCode/result/me")
//   .get(auth, attemptController.getManyByTestCodeAndUserId);

module.exports = router;
