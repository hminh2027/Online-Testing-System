const express = require("express");
const ACTION = require("../constants/action");
const RESOURCE = require("../constants/resource");
const employeeController = require("../controllers/employee.controller");
const authorization = require("../middlewares/authorization.middleware");
const router = express.Router();

router
  .route("/")
  .get(
    authorization(`${RESOURCE.EMPLOYEE}:${ACTION.READ}`),
    employeeController.getEmployees
  )
  .post(
    authorization(`${RESOURCE.EMPLOYEE}:${ACTION.CREATE}`),
    employeeController.createEmployee
  );

router
  .route("/:number")
  .get(
    authorization(`${RESOURCE.EMPLOYEE}:${ACTION.READ}`),
    employeeController.getEmployeeByNumber
  )
  .put(
    authorization(`${RESOURCE.EMPLOYEE}:${ACTION.UPDATE}`),
    employeeController.updateEmployee
  )
  .delete(
    authorization(`${RESOURCE.EMPLOYEE}:${ACTION.DELETE}`),
    employeeController.deleteEmployee
  );

module.exports = router;
