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
      startedAt: new Date().toISOString(),
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
        include: {
          Question: {
            include: { Answer: true },
            orderBy: { index: "asc" },
          },
          Class: true,
        },
      },
    },
  });
}

function getManyByExamId(examId, studentId) {
  return prisma.attempt.findMany({
    where: {
      examId,
      studentId,
    },
    include: {
      Choice: {
        include: { Answer: true, Question: true },
      },
      Exam: {
        include: {
          Question: true,
        },
      },
    },
  });
}

async function updateOneById(id) {
  const attempt = await prisma.attempt.findFirst({
    where: { id },
    include: {
      Choice: {
        include: {
          Answer: true,
          Question: true,
        },
      },
    },
  });

  if (!attempt) return;
  let point = 0;
  attempt.Choice.map((choice) => {
    if (choice.Answer.isCorrect) {
      point += choice.Question.point;
    }
  });

  return prisma.attempt.update({
    where: {
      id,
    },
    data: {
      endedAt: new Date(),
      point,
    },
  });
}

async function patchTaboutById(id) {
  const attempt = await prisma.attempt.findFirst({ where: { id } });
  if (!attempt)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy bài kiểm tra");
  return prisma.attempt.update({
    where: { id },
    data: { numberOfMouseLeave: attempt.numberOfMouseLeave + 1 },
  });
}
module.exports = {
  createOne,
  getOneOngoing,
  getManyByExamId,
  updateOneById,
  patchTaboutById,
};
