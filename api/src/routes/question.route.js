const express = require("express");
const { questionController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(auth, questionController.getManyByExamId)
  .post(auth, questionController.createOne);
router.route("/many").post(auth, questionController.createMany);

router
  .route("/:id")
  .get(auth, questionController.getOneById)
  .put(auth, questionController.updateOneById)
  .delete(auth, questionController.deleteOneById);

router.route("/index").post(auth, questionController.updateIndex);

module.exports = router;
