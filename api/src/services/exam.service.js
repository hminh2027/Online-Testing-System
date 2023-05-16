const { prisma } = require("../database/prisma-client");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

async function createOne(data) {
  return prisma.exam.create({
    data: {
      title: data.title,
      description: data.description,
      duration: +data.duration,
      User: {
        connect: {
          id: data.teacherId,
        },
      },
    },
  });
}

async function getManyByTeacherId(teacherId) {
  return prisma.exam.findMany({
    where: { teacher_id: teacherId },
  });
}

async function updateOneById(id, data) {
  const exam = await prisma.exam.findFirst({
    where: { id, teacher_id: data.usteacherIdrId },
  });

  if (!exam)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy bài kiểm tra");

  return prisma.exam.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      duration: +data.duration,
    },
  });
}

async function deleteOneById(id, teacherId) {
  const test = await prisma.exam.findFirst({
    where: { id, teacherId: teacherId },
  });

  if (!test)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy bài kiểm tra");

  return prisma.test.delete({ where: { id } });
}

module.exports = {
  createOne,
  getManyByTeacherId,
  updateOneById,
  deleteOneById,
};
