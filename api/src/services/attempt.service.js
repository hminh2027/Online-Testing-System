const httpStatus = require("http-status");
const { testService } = require(".");
const { prisma } = require("../database/prisma-client");
const { ApiError } = require("../utils");

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

async function getOneOngoing({ userId }) {
  return prisma.attempt.findFirst({
    where: {
      end_time: null,
      score: null,
      userId,
    },
    include: {
      choices: true,
    },
  });
}

async function getManyByClassExamId(classExamId) {
  return prisma.attempt.findMany({
    where: {
      class_exam_id: classExamId,
    },
    include: {
      choices: {
        include: { Answer: true, Question: true },
      },
    },
  });
}

async function getManyByClassExamIdAndUserId(classExamId, userId) {
  return prisma.attempt.findMany({
    where: {
      userId,
      class_exam_id: classExamId,
    },
    include: {
      choices: {
        include: { Answer: true, Question: true },
      },
    },
  });
}

async function updateOneOnGoing(userId) {
  const attempt = await prisma.attempt.findFirst({
    where: { end_time: null, score: null, userId },
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

  if (!attempt) return;
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

async function updateTaboutOnGoing(userId) {
  const attempt = await getOneOngoing(userId);
  if (!attempt)
    throw new ApiError(httpStatus.NOT_FOUND, "Không có bài kiểm tra đang làm");
  return prisma.attempt.update({
    where: { id: attempt.id },
    data: { tabouts: attempt.tabouts + 1 },
  });
}
module.exports = {
  createOne,
  getOneOngoing,
  getManyByClassExamId,
  getManyByClassExamIdAndUserId,
  updateOneOnGoing,
  updateTaboutOnGoing,
};
