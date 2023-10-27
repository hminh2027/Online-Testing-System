const express = require("express");
const { userClassController } = require("../controllers");

const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(auth, userClassController.getManyByClassCode)
  .post(auth, userClassController.createOne);

module.exports = router;
