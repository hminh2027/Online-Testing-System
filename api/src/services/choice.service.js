const { prisma } = require("../database/prisma-client");

async function createOne({ answerIndex, attemptId, questionIndex }) {
  const choice = await getOne({
    questionIndex,
    answerIndex,
    attemptId,
  });

  if (choice) return updateOne({ id: choice.id, answerIndex });

  return prisma.choice.create({
    data: {
      answerIndex,
      attemptId,
      questionIndex,
    },
  });
}

async function getOne({ attemptId, questionIndex, answerIndex }) {
  return prisma.choice.findFirst({
    where: { attemptId, questionIndex, answerIndex },
  });
}

async function updateOne({ id, answerIndex }) {
  return prisma.choice.update({ where: { id }, data: { answerIndex } });
}

module.exports = {
  createOne,
};
