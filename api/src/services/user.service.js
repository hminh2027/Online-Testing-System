const { prisma } = require("../database/prisma-client");

async function createOne({
  fullname,
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
      fullname,
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

async function getOneByEmail({ email }) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function getOneById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

async function patchOneById(id, data) {
  return prisma.user.update({ where: { id }, data });
}

module.exports = {
  createOne,
  getOneById,
  patchOneById,
  getOneByEmail,
};
