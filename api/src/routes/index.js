const express = require("express");
const authentication = require("../middlewares/authentication.middleware");
const router = express.Router();
const customerRoute = require("./customer.route");
const employeeRoute = require("./employee.route");
const userRoute = require("./user.route");

router.use("/user", userRoute);
router.use("/customer", authentication, customerRoute);
router.use("/employee", authentication, employeeRoute);

module.exports = router;
