const { prisma } = require("../database/prisma-client");

async function createOne({
  username,
  password,
  email,
  isTeacher = false,
  phone = null,
  birth = null,
  school = null,
  studentId = null,
  imageUrl = null,
}) {
  return prisma.user.create({
    data: {
      username,
      password,
      email,
      isTeacher,
      phone,
      birth,
      school,
      studentId,
      imageUrl,
    },
  });
}

async function getOneByEmail(email) {
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
