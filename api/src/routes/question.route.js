const express = require("express");
const { questionController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router.route("/").post(auth, questionController.createOne);

router
  .route("/:id")
  .get(auth, questionController.getOneById)
  .put(auth, questionController.updateOneById)
  .delete(auth, questionController.deleteOneById);

router.route("/index").post(auth, questionController.updateIndex);

module.exports = router;
