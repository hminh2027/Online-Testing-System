const express = require("express");
const { classController } = require("../controllers");
const { postController } = require("../controllers");

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
  .patch(auth, classController.patchStatusByCode)
  .delete(classController.deleteOneByCode);

router
  .route("/:code/post")
  .post(auth, postController.createOne)
  .get(auth, postController.getManyByClassCode);

router
  .route("/:code/post/:id")
  .get(auth, postController.getManyByClassCode)
  .put(auth, postController.updateOneById)
  .delete(auth, postController.deleteOneById);

module.exports = router;
