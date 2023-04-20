const { prisma } = require("../database/prisma-client");

async function createUser({ username, password, employeeNumber }) {
  return await prisma.user.create({
    data: { username, password, employeeEmployeeNumber: employeeNumber },
  });
}

async function getUserByUsername({ username }) {
  return await prisma.user.findFirst({
    where: { username },
    include: { employee: true },
  });
}

module.exports = {
  createUser,
  getUserByUsername,
};
