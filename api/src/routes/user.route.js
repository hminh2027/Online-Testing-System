const express = require("express");
const { userController } = require("../controllers");
const { auth } = require("../middlewares");

const router = express.Router();

router
  .route("/:id")
  .get(userController.getOneById)
  .put(auth, userController.updateOneById);

// TODO: update password later
// ...

module.exports = router;
