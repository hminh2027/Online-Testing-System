const express = require("express");
const { testController } = require("../controllers");

const router = express.Router();

router.route("/").post(testController.createOne);
router.route("/category").get(testController.getAllWithCaregory);
router.route("/category/:categoryId").get(testController.getAllByCategoryId);

router.route("/user/:userId").get(testController.getAllByUserId);

router
  .route("/:testCode")
  .get(testController.getoneByCode)
  .post(testController.createOneQuestion)
  .put(testController.updateOneByCode)
  .delete(testController.deleteOneByCode);

router
  .route("/:testCode/:questionIndex")
  .put(testController.updateOneQuestion)
  .delete(testController.deleteOneQuestion);

// router
//   .route("/:testCode/:questionIndex/:answerIndex")
//   .put(testController.createOneQuestion)
//   .delete(testController.deleteOneQuestion);
module.exports = router;
