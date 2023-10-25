const express = require("express");
const { postController } = require("../controllers");

const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(auth, postController.getManyByClassCode)
  .post(auth, postController.createOne);

router
  .route("/:id")
  .get(auth, postController.getOneById)
  .put(auth, postController.updateOneById)
  .delete(auth, postController.deleteOneById);

module.exports = router;
