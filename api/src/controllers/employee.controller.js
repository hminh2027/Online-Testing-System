const employeeService = require("../services/employee.service");
const catchAsync = require("../utils/catchAsync");

const getEmployees = catchAsync(async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;

  const employees = await employeeService.getEmployees(+limit, +skip);
  return res.status(200).json({
    data: employees,
    pagination: {
      page,
      total: employees.length,
    },
  });
});

const getEmployeeByNumber = catchAsync(async (req, res) => {
  const { number } = req.params;
  const employee = await employeeService.getEmployeeByNumber(+number);
  return res.status(200).json({
    data: employee,
    message: "Employee retrieved successfully",
  });
});

const createEmployee = catchAsync(async (req, res) => {
  let {
    lastName,
    firstName,
    email,
    extension,
    officeCode,
    reportsTo,
    jobTitle,
  } = req.body;
  const employee = await employeeService.createEmployee({
    lastName,
    firstName,
    email,
    extension,
    officeCode,
    reportsTo,
    jobTitle,
  });
  return res
    .status(200)
    .json({ message: "Employee created successfully", data: employee });
});

const updateEmployee = catchAsync(async (req, res) => {
  let {
    lastName,
    firstName,
    email,
    extension,
    officeCode,
    reportsTo,
    jobTitle,
  } = req.body;
  const { number } = req.params;
  const employee = await employeeService.updateEmployee(+number, {
    lastName,
    firstName,
    email,
    extension,
    officeCode,
    reportsTo,
    jobTitle,
  });
  return res
    .status(200)
    .json({ message: "Employee updated successfully", data: employee });
});

const deleteEmployee = catchAsync(async (req, res) => {
  const { number } = req.params;
  await employeeService.deleteEmployeeByNumber(+number);
  return res.status(200).json({ message: "Employee deleted successfully" });
});

module.exports = {
  getEmployees,
  updateEmployee,
  createEmployee,
  deleteEmployee,
  getEmployeeByNumber,
};
