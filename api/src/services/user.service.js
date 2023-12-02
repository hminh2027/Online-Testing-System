const { prisma } = require("../database/prisma-client");

function createOne({
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

function getOneByEmail({ email }) {
  return prisma.user.findUnique({
    where: { email },
  });
}

function getManyStudent() {
  return prisma.user.findMany({ where: { isTeacher: false } });
}

function getOneById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

function patchOneById(id, data) {
  return prisma.user.update({ where: { id }, data });
}

module.exports = {
  createOne,
  getOneById,
  getManyStudent,
  patchOneById,
  getOneByEmail,
};
