const { prisma } = require("../database/prisma-client");

function createOne({ classCode, studentId, isPending }) {
  return prisma.userClass.create({
    data: { isPending, classCode, studentId },
  });
}

function getManyByClassCode({ classCode }) {
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

function patchStatusById(id, { teacherId, isPending }) {
  return prisma.userClass.update({
    where: {
      id,
      Class: {
        teacherId,
      },
    },
    data: {
      isPending,
    },
  });
}

function deleteOneById(id, { teacherId }) {
  return prisma.userClass.delete({
    where: {
      id,
      Class: {
        teacherId,
      },
    },
  });
}

module.exports = {
  createOne,
  getManyByClassCode,
  patchStatusById,
  deleteOneById,
};
