const { prisma } = require("../database/prisma-client");

function createOne(data) {
  return prisma.answer.create({
    data: {
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

function updateOneById(id, data) {
  return prisma.answer.update({ where: { id }, data });
}

function updateMany(questionId, data) {
  data.forEach(async (ans) => {
    if (ans.id) await updateOneById(ans.id, { ...ans, questionId });
    else await createOne({ ...ans, questionId });
  });

  return true;
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
