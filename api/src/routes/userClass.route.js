const express = require("express");
const { userClassController } = require("../controllers");

const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(auth, userClassController.getManyByStatus)
  .post(auth, userClassController.createOne);

module.exports = router;
