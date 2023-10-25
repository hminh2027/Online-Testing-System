const { prisma } = require("../database/prisma-client");
const { generateUniqueId } = require("../utils");

function createOne({
  teacherId,
  name,
  imageUrl = "",
  description = "",
  password = "",
  isStudentApprovalLeave,
  isStudentPostAllowed,
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
      isStudentPostAllowed,
    },
  });
}

function getOneByCode(code) {
  return prisma.class.findUnique({
    where: { code },
  });
}

function getOneByUsername(username) {
  return prisma.user.findFirst({
    where: { username },
  });
}

function getManyByTeacherId(teacherId) {
  return prisma.class.findMany({
    where: { teacherId },
  });
}

function getManyByStudentId(studentId) {
  return prisma.userClass.findMany({
    where: { student_id: studentId },
  });
}

function updateOneByCode(code, data) {
  return prisma.class.update({ where: { code } }, data);
}

function deleteOneByCode(code) {
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
