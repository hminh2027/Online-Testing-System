const { prisma } = require("../database/prisma-client");
const { generateUniqueId } = require("../utils");

async function createOne({
  teacherId,
  name,
  imageUrl = "",
  description = "",
  password = "",
  isStudentApprovalLeave,
}) {
  const code = generateUniqueId(6);
  return prisma.class.create({
    data: {
      code,
      name,
      password,
      teacherId,
      description,
      imageUrl,
      isStudentApprovalLeave,
    },
  });
}

async function getOneByCode(code) {
  return prisma.class.findUnique({
    where: { code },
  });
}

async function getOneByUsername(username) {
  return prisma.user.findFirst({
    where: { username },
  });
}

async function getManyByTeacherId(teacherId) {
  return prisma.class.findMany({
    where: { teacherId },
  });
}

async function getManyByStudentId(studentId) {
  return prisma.userClass.findMany({
    where: { student_id: studentId },
    select: { Class },
  });
}

async function updateOneByCode(code, data) {
  return prisma.class.update({ where: { code } }, data);
}

async function deleteOneByCode(code) {
  return prisma.class.delete({ where: { code } });
}

module.exports = {
  createOne,
  getOneByCode,
  updateOneByCode,
  getOneByUsername,
  getManyByTeacherId,
  getManyByStudentId,
  deleteOneByCode,
};
