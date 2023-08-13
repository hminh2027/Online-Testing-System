const { prisma } = require("../database/prisma-client");

async function createOne({
  teacherId,
  name,
  imageUrl = "",
  description = "",
  grade = "",
  password = "",
  isPublic,
}) {
  return prisma.class.create({
    data: { name, password, teacherId, description, imageUrl, grade, isPublic },
  });
}

async function getOneById(id) {
  return prisma.class.findUnique({
    where: { id },
  });
}

async function getOneByUsername(username) {
  return prisma.user.findFirst({
    where: { username },
  });
}

async function getManyByTeacherId(teacherId) {
  return prisma.class.findMany({
    where: { teacher_id: teacherId },
  });
}

async function getManyByStudentId(studentId) {
  return prisma.userClass.findMany({
    where: { student_id: studentId },
    select: { Class },
  });
}

async function updateOneById(id, data) {
  return prisma.class.update({ where: { id } }, data);
}

async function deleteOneById(id) {
  return prisma.class.delete({ where: { id } });
}

module.exports = {
  createOne,
  getOneById,
  updateOneById,
  getOneByUsername,
  getManyByTeacherId,
  getManyByStudentId,
  deleteOneById,
};
