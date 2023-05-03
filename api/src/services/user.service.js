const { prisma } = require("../database/prisma-client");

async function createOne({ name, password, email }) {
  return prisma.user.create({
    data: { name, password, email, credit: 100, avatar_url: "" },
  });
}

async function getOneByEmail({ email }) {
  return prisma.user.findFirst({
    where: { email },
  });
}

async function getOneById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

async function updateOneById(id, data) {
  return prisma.user.update({ where: { id } }, data);
}

module.exports = {
  createOne,
  getOneById,
  updateOneById,
  getOneByEmail,
};
