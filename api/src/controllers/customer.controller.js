const customerService = require("../services/customer.service");
const catchAsync = require("../utils/catchAsync");

const createCustomer = catchAsync(async (req, res) => {
  let {
    customerName,
    contactLastName,
    contactFirstName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    salesRepEmployeeNumber,
    creditLimit,
  } = req.body;
  const customer = await customerService.createCustomer({
    customerName,
    contactLastName,
    contactFirstName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    salesRepEmployeeNumber,
    creditLimit,
  });
  res
    .status(200)
    .json({ message: "Customer created successfully", data: customer });
});

const updateCustomer = catchAsync(async (req, res) => {
  let {
    customerName,
    contactLastName,
    contactFirstName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    salesRepEmployeeNumber,
    creditLimit,
  } = req.body;
  const { number } = req.params;
  const customer = await customerService.updateCustomer(+number, {
    customerName,
    contactLastName,
    contactFirstName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    salesRepEmployeeNumber,
    creditLimit,
  });
  return res
    .status(200)
    .json({ message: "Customer updated successfully", data: customer });
});

const getCustomers = catchAsync(async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;

  const customers = await customerService.getCustomers(+limit, skip);
  res.status(200).json({
    data: customers,
    pagination: {
      page,
      total: customers.length,
    },
  });
});

const getCustomerByNumber = catchAsync(async (req, res) => {
  const { number } = req.params;
  const customer = await customerService.getCustomerByNumber(+number);
  res.status(200).json({
    data: customer,
    message: "Customer retrieved successfully",
  });
});

const deleteCustomerByNumber = catchAsync(async (req, res) => {
  const { number } = req.params;
  await customerService.deleteCustomerByNumber(+number);
  res.status(200).json({ message: "Customer deleted successfully" });
});

module.exports = {
  getCustomers,
  createCustomer,
  getCustomerByNumber,
  deleteCustomerByNumber,
  updateCustomer,
};
