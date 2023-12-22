const express = require("express");
const { commentController } = require("../controllers");

const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .post(auth, commentController.createOne)
  .get(auth, commentController.getManyByPostId);

router
  .route("/:id")
  .put(auth, commentController.updateOneById)
  .delete(auth, commentController.deleteOneById);

module.exports = router;
