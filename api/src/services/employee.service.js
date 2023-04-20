const { prisma } = require("../database/prisma-client");

async function createEmployee(employee) {
  return await prisma.employee.create({
    data: employee,
  });
}

async function updateEmployee(employeeNumber, employee) {
  return await prisma.employee.update({
    where: { employeeNumber },
    data: employee,
  });
}

async function deleteEmployeeByNumber(employeeNumber) {
  await prisma.employee.delete({ where: { employeeNumber } });
  return;
}

async function getEmployees(take, skip) {
  return await prisma.employee.findMany({ take, skip });
}

async function getEmployeeByNumber(employeeNumber) {
  return await prisma.employee.findUnique({
    where: { employeeNumber },
  });
}

module.exports = {
  getEmployees,
  deleteEmployeeByNumber,
  getEmployeeByNumber,
  updateEmployee,
  createEmployee,
};
