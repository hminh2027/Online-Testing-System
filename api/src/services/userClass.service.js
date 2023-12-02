const { prisma } = require("../database/prisma-client");

function createOne({ classCode, studentId, isPending, isStudentRequested }) {
  return prisma.userClass.create({
    data: { isPending, classCode, studentId, isStudentRequested },
  });
}

function getOneByStudentIdAndClassCode(studentId, classCode) {
  return prisma.userClass.findFirst({
    where: {
      classCode,
      studentId,
    },
  });
}

function getManyByClassCode(classCode) {
  const include = {
    Class: true,
    User: true,
  };

  if (!classCode)
    return prisma.userClass.findMany({
      include,
    });

  return prisma.userClass.findMany({
    include,
    where: {
      classCode,
    },
  });
}

function getManyByStudentId(studentId) {
  return prisma.userClass.findMany({
    where: {
      studentId,
    },
    include: { Class: { include: { User: true } } },
  });
}

function patchStatusById(id, { isPending }) {
  console.log(id);
  return prisma.userClass.update({
    where: {
      id,
    },
    data: {
      isPending,
    },
  });
}

function deleteOneById(id) {
  return prisma.userClass.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  createOne,
  getOneByStudentIdAndClassCode,
  getManyByClassCode,
  getManyByStudentId,
  patchStatusById,
  deleteOneById,
};
