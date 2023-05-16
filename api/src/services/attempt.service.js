const httpStatus = require("http-status");
const { testService } = require(".");
const { prisma } = require("../database/prisma-client");
const { ApiError } = require("../utils");
const { redis } = require("../database/redis");

async function createOne({ userId, testCode }) {
  const test = await testService.getOneByCode(testCode);
  if (!test)
    throw new ApiError(httpStatus.NOT_FOUND, "Bài kiểm tra không tồn tại");
  if (test.attempts.length >= test.attempt_limit)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Đã đạt giới hạn làm bài kiểm tra"
    );
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

async function getManyByTestCode({ userId, testCode }) {
  return prisma.attempt.findMany({
    where: {
      testCode,
    },
    include: {
      choices: {
        include: { Answer: true, Question: true },
      },
    },
  });
}

async function getManyByTestCodeAndUserId({ userId, testCode }) {
  return prisma.attempt.findMany({
    where: {
      userId,
      testCode,
    },
    include: {
      choices: {
        include: { Answer: true, Question: true },
      },
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
      number_of_tabout: await redis.get(userId),
    },
  });
}

module.exports = {
  createOne,
  getOneOngoing,
  getManyByTestCode,
  getManyByTestCodeAndUserId,
  updateOneById,
};
