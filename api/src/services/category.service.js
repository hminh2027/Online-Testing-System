const { prisma } = require("../database/prisma-client");

async function createOne(data) {
  return prisma.category.create({
    data: {
      name: data.name,
    },
  });
}

async function getAll() {
  return prisma.category.findMany({ include: { tests: true } });
}

module.exports = {
  createOne,
  getAll,
};
