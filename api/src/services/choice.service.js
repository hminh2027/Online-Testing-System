const { prisma } = require("../database/prisma-client");

async function createOne({ answerId, attemptId, questionId }) {
  return prisma.choice.upsert({
    create: {
      answerId,
      attemptId,
      questionId,
    },
    update: {
      answerId,
      attemptId,
      questionId,
    },
    where: {
      id: answerId,
    },
  });
}

module.exports = {
  createOne,
};
