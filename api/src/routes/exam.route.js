const express = require("express");
const { examController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router.route("/").post(auth, examController.createOne);
router.route("/category").get(examController.getAllWithCategory);
router.route("/category/:categoryId").get(examController.getAllByCategoryId);

router.route("/user/:userId").get(examController.getAllByUserId);

router
  .route("/:id")
  .get(examController.getoneByCode)
  .post(auth, examController.createOneQuestion)
  .put(auth, examController.updateOneByCode)
  .delete(auth, examController.deleteOneByCode);

router
  .route("/:testCode/:questionIndex")
  .put(auth, examController.updateOneQuestion)
  .delete(auth, examController.deleteOneQuestion);

// router
//   .route("/:testCode/:questionIndex/:answerIndex")
//   .put(examController.createOneQuestion)
//   .delete(examController.deleteOneQuestion);
module.exports = router;
