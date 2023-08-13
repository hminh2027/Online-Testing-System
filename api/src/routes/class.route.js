const express = require("express");
const { classController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/:id")
  .get(classController.getOneById)
  .get("/users", classController.getUsersByClassId)
  .put(auth, classController.updateOneById)
  .delete(classController.deleteOneById);

module.exports = router;
