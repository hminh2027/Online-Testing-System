const { prisma } = require("../database/prisma-client");

function createOne(data) {
  return prisma.question.create({
    data: {
      index: data.index,
      content: data.content,
      imageUrl: data.imageUrl,
      point: data.point,
      explaination: data.explaination,
      isPointPerCorrection: data.isPointPerCorrection,
      Exam: {
        connect: { id: data.examId },
      },
    },
  });
}

function count(examId) {
  return prisma.question.count({ where: { examId } });
}

function getOneById(id) {
  return prisma.question.findUnique({
    where: { id },
    include: {
      Answer: true,
    },
  });
}

function updateOneById(id, data) {
  return prisma.question.update({
    data: {
      index: data.index,
      content: data.content,
      imageUrl: data.imageUrl,
      point: data.point,
      explanation: data.explanation,
    },
    where: { id },
  });
}

function patchIndexById(id, index) {
  return prisma.question.update({
    data: {
      index,
    },
    where: { id },
  });
}

function deleteOneById(id) {
  return prisma.question.delete({
    where: { id },
  });
}

function deleteMany(examId) {
  return prisma.question.deleteMany({ where: { examId } });
}

module.exports = {
  createOne,
  getOneById,
  count,
  updateOneById,
  patchIndexById,
  deleteOneById,
  deleteMany,
};
