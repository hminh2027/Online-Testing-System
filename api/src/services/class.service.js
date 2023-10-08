const { prisma } = require("../database/prisma-client");

async function createOne({
  teacherId,
  name,
  imageUrl = "",
  description = "",
  grade = "",
  password = "",
  isStudentApprovalJoin,
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
      grade,
      isStudentApprovalJoin,
      isStudentApprovalLeave,
    },
  });
}

async function getOneByCode(id) {
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

async function updateOneByCode(id, data) {
  return prisma.class.update({ where: { id } }, data);
}

async function deleteOneByCode(id) {
  return prisma.class.delete({ where: { id } });
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
