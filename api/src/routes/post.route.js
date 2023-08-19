const express = require("express");
const { postController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router.route("/").post(auth, postController.createOne);
router.route("/category").get(postController.getAllWithCategory);
router.route("/category/:categoryId").get(postController.getAllByCategoryId);

router.route("/user/:userId").get(postController.getAllByUserId);

router
  .route("/:id")
  .get(postController.getoneByCode)
  .post(auth, postController.createOneQuestion)
  .put(auth, postController.updateOneByCode)
  .delete(auth, postController.deleteOneByCode);

router
  .route("/:testCode/:questionIndex")
  .put(auth, postController.updateOneQuestion)
  .delete(auth, postController.deleteOneQuestion);

// router
//   .route("/:testCode/:questionIndex/:answerIndex")
//   .put(postController.createOneQuestion)
//   .delete(postController.deleteOneQuestion);
module.exports = router;
