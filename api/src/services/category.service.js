const { prisma } = require("../database/prisma-client");

async function createOne(data) {
  return prisma.category.create({
    data: {
      name: data.name,
    },
  });
}

module.exports = {
  createOne,
};
