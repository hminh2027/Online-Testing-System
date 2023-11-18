const { prisma } = require("../database/prisma-client");

async function upsertOne({ answerId, attemptId, questionId }) {
  const choice = await prisma.choice.findFirst({
    where: { attemptId, questionId },
  });

  return prisma.choice.upsert({
    where: { id: choice ? choice.id : 0 },
    create: { answerId, attemptId, questionId },
    update: { answerId },
  });
}

async function upsertMany(choices) {
  const { attemptId, questionId } = choices[0];
  await prisma.choice.deleteMany({
    where: { attemptId, questionId },
  });

  return prisma.choice.createMany({
    data: choices.map((choice) => ({
      answerId: +choice.answerId,
      questionId: +choice.questionId,
      attemptId: +choice.attemptId,
    })),
  });
}

module.exports = {
  upsertOne,
  upsertMany,
};
