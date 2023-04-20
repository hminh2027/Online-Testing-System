const express = require("express");
const ACTION = require("../constants/action");
const RESOURCE = require("../constants/resource");
const customerController = require("../controllers/customer.controller");
const authorization = require("../middlewares/authorization.middleware");
const { validation } = require("../middlewares/validation.middleware");
const {
  createCustomer,
  updateCustomer,
} = require("../validations/customer.validation");

const router = express.Router();

router
  .route("/")
  .get(
    authorization(`${RESOURCE.CUSTOMER}:${ACTION.READ}`),
    customerController.getCustomers
  )
  .post(
    validation(createCustomer),
    authorization(`${RESOURCE.CUSTOMER}:${ACTION.CREATE}`),
    customerController.createCustomer
  );

router
  .route("/:number")
  .get(
    authorization(`${RESOURCE.CUSTOMER}:${ACTION.READ}`),
    customerController.getCustomerByNumber
  )
  .put(
    validation(updateCustomer),
    authorization(`${RESOURCE.CUSTOMER}:${ACTION.UPDATE}`),
    customerController.updateCustomer
  )
  .delete(
    authorization(`${RESOURCE.CUSTOMER}:${ACTION.DELETE}`),
    customerController.deleteCustomerByNumber
  );

module.exports = router;
