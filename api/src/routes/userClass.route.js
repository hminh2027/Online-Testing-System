const express = require("express");
const { userClassController } = require("../controllers");

const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(auth, userClassController.getMany)
  .post(auth, userClassController.createOne);

router.route("/many").post(auth, userClassController.createManyByStudentId);

router
  .route("/:id")
  .patch(auth, userClassController.patchStatusById)
  .delete(auth, userClassController.deleteOneById);

module.exports = router;
