const express = require("express");
const { attemptController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .put(auth, attemptController.updateOneOngoing)
  .post(auth, attemptController.createOne);
router.route("/:testCode").get(auth, attemptController.getOneOngoing);

module.exports = router;
