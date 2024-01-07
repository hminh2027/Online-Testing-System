const { prisma } = require("../database/prisma-client");

function createOne(data) {
  return prisma.exam.create({
    data: {
      title: data.title,
      description: data.description,
      duration: +data.duration,
      attemptLimit: data.attemptLimit && +data.attemptLimit,
      endAt: data.endAt,
      isProctoring: data.isProctoring,
      isResumeAllowed: data.isResumeAllowed,
      isShowAnswer: data.isShowAnswer,
      isShuffleQuestion: data.isShuffleQuestion,
      startAt: data.startAt,
      ...(data.classCode
        ? {
            Class: {
              connect: { code: data.classCode },
            },
          }
        : {}),
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
      Attempt: true,
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
    include: { Class: true },
  });
}

function getManyByStudentId(studentId) {
  return prisma.userClass.findMany({
    where: { studentId },
    select: { Class: { select: { Exam: true } } },
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
        Question: true,
      },
    }),
    orderBy: { createdAt: "desc" },
  });
}

async function updateOneById(id, data) {
  const exam = await getOneById(id);

  if (!exam)
    throw new ApiError(httpStatus.NOT_FOUND, "Bài kiểm tra không tồn tại");

  const shouldDisconnectClassCode = !data.classCode && !!exam.classCode;

  return prisma.exam.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      duration: +data.duration,
      attemptLimit: data.attemptLimit && +data.attemptLimit,
      endAt: data.endAt,
      isProctoring: data.isProctoring,
      isResumeAllowed: data.isResumeAllowed,
      isShowAnswer: data.isShowAnswer,
      isShuffleQuestion: data.isShuffleQuestion,
      startAt: data.startAt,
      Class: {
        ...(data.classCode
          ? { connect: { code: data.classCode } }
          : shouldDisconnectClassCode
          ? { disconnect: { code: data.classCode } }
          : {}),
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
  getManyByStudentId,
  getManyByClassCode,
  updateOneById,
  deleteOneById,
};
