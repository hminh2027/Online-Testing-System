const { prisma } = require("../database/prisma-client");
const { generateUniqueId } = require("../utils");

function createOne({
  teacherId,
  name,
  imageUrl = "",
  description = "",
  password = "",
  isStudentApprovalEnter,
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
      isStudentApprovalEnter,
      isStudentApprovalLeave,
      isStudentPostAllowed,
    },
  });
}

function getOneByCode(code) {
  return prisma.class.findUnique({
    where: { code },
    include: {
      User: { select: { fullname: true } },
    },
  });
}

function getManyByTeacherId(teacherId, name) {
  return prisma.class.findMany({
    where: { teacherId, name: { contains: name } },
    include: { Exam: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  });
}

async function getManyByStudentId(studentId, name) {
  const classRoom = await prisma.userClass.findMany({
    where: {
      isPending: false,
      studentId,
      Class: {
        name: { contains: name },
      },
    },
    select: {
      Class: true,
    },
  });

  return classRoom.map((item) => ({
    ...item.Class,
  }));
}

function updateOneByCode(code, data) {
  return prisma.class.update({ where: { code }, data });
}

function deleteOneByCode(code) {
  return prisma.class.delete({ where: { code } });
}

module.exports = {
  createOne,
  getOneByCode,
  updateOneByCode,
  getManyByTeacherId,
  getManyByStudentId,
  deleteOneByCode,
};
