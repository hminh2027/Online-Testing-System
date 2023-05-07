const express = require("express");
const { testController } = require("../controllers");

const router = express.Router();

router.route("/").post(testController.createOne);
router.route("/category").get(testController.getAllWithCaregory);
router.route("/category/:categoryId").get(testController.getAllByCategoryId);

router
  .route("/:testCode")
  .get(testController.getoneByCode)
  .post(testController.createOneQuestion);

module.exports = router;
