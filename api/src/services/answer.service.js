const { prisma } = require("../database/prisma-client");

async function createOne(data) {
  return prisma.answer.create({
    data: {
      index: data.index,
      text: data.text,
      is_correct: data.isCorrect,
      questionId: data.questionId,
    },
  });
}

module.exports = {
  createOne,
};
