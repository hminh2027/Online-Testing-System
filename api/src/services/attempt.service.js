const { prisma } = require("../database/prisma-client");

async function createOne({ userId, testCode }) {
  return prisma.attempt.create({
    data: {
      start_time: new Date(Date.now()),
      User: {
        connect: { id: userId },
      },
      Test: {
        connect: { code: testCode },
      },
    },
    include: {
      choices: true,
    },
  });
}

async function getOneOngoing({ userId, testCode }) {
  return prisma.attempt.findFirst({
    where: {
      end_time: null,
      score: null,
      userId,
      testCode,
    },
    include: {
      choices: true,
    },
  });
}

async function updateOneById({ userId, attemptId }) {
  const attempt = await prisma.attempt.findFirst({
    where: { id: attemptId, end_time: null, score: null, userId },
    include: {
      choices: {
        include: {
          Answer: {
            include: {
              Question: true,
            },
          },
        },
      },
    },
  });

  let score = 0;
  attempt.choices.map((choice) => {
    if (choice.Answer.is_correct) {
      score += choice.Answer.Question.score;
    }
  });

  return prisma.attempt.update({
    where: {
      id: attemptId,
    },
    data: {
      end_time: new Date(Date.now()),
      score,
    },
  });
}

module.exports = {
  createOne,
  getOneOngoing,
  updateOneById,
};
