const express = require("express");
const { notificationController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(auth, notificationController.getManyByUserId)
  .post(auth, notificationController.createOne);

module.exports = router;
