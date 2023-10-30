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

async function createMany(data) {
  // return prisma.question.createMany({
  //   data: {
  //     index: data.index,
  //     content: data.content,
  //     image_url: data.imageUrl,
  //     score: data.score,
  //     Exam: {
  //       connect: { id: data.examId },
  //     },
  //   },
  // });
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
  createMany,
  updateOneById,
  deleteOneById,
};
