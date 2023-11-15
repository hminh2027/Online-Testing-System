const httpStatus = require("http-status");
const { prisma } = require("../database/prisma-client");
const { ApiError } = require("../utils");
const { examService } = require(".");

async function createOne({ studentId, examId }) {
  const exam = await examService.getOneById(examId);
  if (!exam)
    throw new ApiError(httpStatus.NOT_FOUND, "Bài kiểm tra không tồn tại");

  return prisma.attempt.create({
    data: {
      User: {
        connect: { id: studentId },
      },
      Exam: {
        connect: { id: examId },
      },
    },
  });
}

function getOneOngoing(studentId) {
  return prisma.attempt.findFirst({
    where: {
      endedAt: null,
      point: null,
      studentId,
    },
    include: {
      Choice: {
        include: { Question: true, Answer: true },
      },
      Exam: {
        select: { Class: { select: { code: true } } },
      },
    },
  });
}

function getManyByClassExamId(classExamId) {
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

function getManyByClassExamIdAndUserId(classExamId, userId) {
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

async function patchTabout(studentId) {
  const attempt = await getOneOngoing(studentId);
  if (!attempt)
    throw new ApiError(httpStatus.NOT_FOUND, "Không có bài kiểm tra đang làm");
  return prisma.attempt.update({
    where: { id: attempt.id },
    data: { numberOfMouseLeave: attempt.numberOfMouseLeave + 1 },
  });
}
module.exports = {
  createOne,
  getOneOngoing,
  getManyByClassExamId,
  getManyByClassExamIdAndUserId,
  updateOneOnGoing,
  patchTabout,
};
