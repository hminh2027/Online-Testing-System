const { prisma } = require("../database/prisma-client");

async function createCustomer(customer) {
  return await prisma.customer.create({
    data: customer,
  });
}

async function updateCustomer(customerNumber, customer) {
  return await prisma.customer.update({
    where: { customerNumber },
    data: customer,
  });
}

async function deleteCustomerByNumber(customerNumber) {
  await prisma.customer.delete({ where: { customerNumber } });
  return;
}

async function getCustomers(take, skip) {
  return await prisma.customer.findMany({
    take,
    skip,
    include: { Employee: true },
  });
}

async function getCustomerByNumber(customerNumber) {
  return await prisma.customer.findUnique({
    where: { customerNumber },
  });
}

module.exports = {
  getCustomers,
  createCustomer,
  getCustomerByNumber,
  deleteCustomerByNumber,
  updateCustomer,
};
