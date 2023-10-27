const express = require("express");
const { examController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(auth, examController.getManyByTeacherId)
  .post(auth, examController.createOne);

router
  .route("/:id")
  .get(auth, examController.getOneById)
  .put(auth, examController.updateOneById)
  .delete(auth, examController.deleteOneById);

module.exports = router;
