const { prisma } = require("../database/prisma-client");

function createOne(data) {
  return prisma.answer.create({
    data: {
      index: data.index,
      content: data.content,
      isCorrect: data.isCorrect,
      Question: {
        connect: {
          id: data.questionId,
        },
      },
    },
  });
}

function createMany(data) {
  return prisma.answer.createMany({
    data,
  });
}

function updateMany(data) {
  return prisma.answer.upsert({
    data,
    where,
  });
}

function deleteOneById(id) {
  return prisma.answer.delete({
    where: { id },
  });
}

module.exports = {
  createOne,
  createMany,
  updateMany,
  deleteOneById,
};
