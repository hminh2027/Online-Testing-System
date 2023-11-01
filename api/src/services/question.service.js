const { prisma } = require("../database/prisma-client");

async function createOne(data) {
  return prisma.question.create({
    data: {
      index: data.index,
      content: data.content,
      imageUrl: data.imageUrl,
      score: data.score,
      explaination: data.explaination,
      isPointPerCorrection: data.isPointPerCorrection,
      Exam: {
        connect: { id: data.examId },
      },
    },
  });
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
      score: data.score,
      explaination: data.explaination,
    },
    where: { id },
  });
}

function deleteOneById(id) {
  return prisma.question.delete({
    where: { id },
  });
}

module.exports = {
  createOne,
  getOneById,
  updateOneById,
  deleteOneById,
};
