const express = require("express");
const { userController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router.route("/").get(userController.getStudents);

router
  .route("/:id")
  .get(userController.getOneById)
  .patch(auth, userController.patchOneById);

module.exports = router;
