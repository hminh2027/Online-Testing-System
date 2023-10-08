const express = require("express");
const { classController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(auth, classController.getManyByUserId)
  .post(auth, classController.createOne);

router
  .route("/:code")
  .get(classController.getOneByCode)
  // .get("/users", classController.getUsersByClassCode)
  .put(auth, classController.updateOneByCode)
  .delete(classController.deleteOneByCode);

module.exports = router;
