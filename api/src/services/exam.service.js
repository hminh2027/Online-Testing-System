const { prisma } = require("../database/prisma-client");

function createOne(data) {
  return prisma.exam.create({
    data: {
      title: data.title,
      description: data.description,
      duration: +data.duration,
      attemptLimit: data.attemptLimit && +data.attemptLimit,
      deadlineAt: data.deadlineAt,
      isProcting: data.isProcting,
      isResumeAllowed: data.isResumeAllowed,
      isShowAnswer: data.isShowAnswer,
      isShowExplaination: data.isShowExplaination,
      isShuffleQuestion: data.isShuffleQuestion,
      isSubmitLateAllowed: data.isSubmitLateAllowed,
      startAt: data.startAt,
      Class: {
        connect: { code: data.classCode },
      },
      User: {
        connect: {
          id: +data.teacherId,
        },
      },
    },
    include: {
      Question: {
        include: { Answer: true },
      },
    },
  });
}

async function getOneById(id) {
  const exam = await prisma.exam.findUnique({
    where: { id },
    include: {
      Question: {
        include: { Answer: true },
        orderBy: { index: "asc" },
      },
      Class: true,
    },
  });

  return {
    ...exam,
    numberOfQuestions: exam.Question.length,
    totalPoint: exam.Question.reduce((acc, value) => acc + value.point, 0),
  };
}

function getManyByTeacherId(teacherId) {
  return prisma.exam.findMany({
    where: { teacherId },
    orderBy: { createdAt: "desc" },
  });
}

function getManyByClassCode(classCode, studentId) {
  return prisma.exam.findMany({
    where: {
      classCode,
    },
    ...(studentId && {
      include: {
        Attempt: { where: { studentId } },
      },
    }),
    orderBy: { createdAt: "desc" },
  });
}

function updateOneById(id, data) {
  return prisma.exam.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      duration: +data.duration,
      attemptLimit: data.attemptLimit && +data.attemptLimit,
      deadlineAt: data.deadlineAt,
      isProcting: data.isProcting,
      isResumeAllowed: data.isResumeAllowed,
      isShowAnswer: data.isShowAnswer,
      isShowExplaination: data.isShowExplaination,
      isShuffleQuestion: data.isShuffleQuestion,
      isSubmitLateAllowed: data.isSubmitLateAllowed,
      startAt: data.startAt,
      Class: {
        connect: { code: data.classCode },
      },
    },
  });
}

function deleteOneById(id) {
  return prisma.exam.delete({ where: { id: +id } });
}

module.exports = {
  createOne,
  getOneById,
  getManyByTeacherId,
  getManyByClassCode,
  updateOneById,
  deleteOneById,
};
