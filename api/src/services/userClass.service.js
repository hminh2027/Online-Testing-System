const { prisma } = require("../database/prisma-client");

async function createOne({ classCode, studentId, isPending }) {
  return prisma.userClass.create({
    data: { isPending, classCode, studentId },
  });
}

async function getManyByClassCode({ classCode }) {
  const include = {
    Class: true,
    User: true,
  };

  if (!classCode)
    return prisma.userClass.findMany({
      include,
    });

  return prisma.userClass.findMany({
    include,
    where: {
      classCode,
    },
  });
}

module.exports = {
  createOne,
  getManyByClassCode,
};
