const { prisma } = require("../database/prisma-client");

async function createOne({ classCode, studentId, status }) {
  return prisma.userClass.create({
    data: { status, classCode, studentId },
  });
}

async function getManyByStatus({ status, classCode }) {
  return prisma.userClass.findMany({
    where: {
      status,
      classCode,
    },
  });
}

module.exports = {
  createOne,
  getManyByStatus,
};
