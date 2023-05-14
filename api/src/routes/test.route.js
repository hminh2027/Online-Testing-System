const express = require("express");
const { testController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router.route("/").post(auth, testController.createOne);
router.route("/category").get(testController.getAllWithCategory);
router.route("/category/:categoryId").get(testController.getAllByCategoryId);

router.route("/user/:userId").get(testController.getAllByUserId);

router
  .route("/:testCode")
  .get(testController.getoneByCode)
  .post(auth, testController.createOneQuestion)
  .put(auth, testController.updateOneByCode)
  .delete(auth, testController.deleteOneByCode);

router
  .route("/:testCode/:questionIndex")
  .put(auth, testController.updateOneQuestion)
  .delete(auth, testController.deleteOneQuestion);

// router
//   .route("/:testCode/:questionIndex/:answerIndex")
//   .put(testController.createOneQuestion)
//   .delete(testController.deleteOneQuestion);
module.exports = router;
