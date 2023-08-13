const { prisma } = require("../database/prisma-client");

async function createOne(data) {
  return prisma.classExam.create({
    data: {
      start_time: data.startTime,
      end_time: data.endTime,
      attempt_limit: data.attemptLimit,
      is_public: data.isPublic,
      is_mix: data.isMix,
      is_show_answer: data.isShowAnswer,
      Exam: {
        connect: { id: data.examId },
      },
      UserClass: {
        connect: { id: data.userClassId },
      },
    },
  });
}

async function getOneById(id) {
  return prisma.classExam.findFirst({
    where: { id },
  });
}

async function getManyByUserClassId(classId) {
  return prisma.classExam.findFirst({
    where: { user_class_id: classId },
  });
}

async function getManyByExamId(examId) {
  return prisma.classExam.findFirst({
    where: { exam_id: examId },
  });
}

async function updateOneById(id, data) {
  return prisma.classExam.update({
    where: { id },
    data: {
      start_time: data.startTime,
      end_time: data.endTime,
      attempt_limit: data.attemptLimit,
      is_public: data.isPublic,
      is_mix: data.isMix,
      is_show_answer: data.isShowAnswer,
      Exam: {
        connect: { id: data.examId },
      },
      UserClass: {
        connect: { id: data.userClassId },
      },
    },
  });
}

async function deleteOneById(id) {
  return prisma.classExam.delete({ where: { id } });
}

module.exports = {
  createOne,
  getOneById,
  getManyByUserClassId,
  getManyByExamId,
  updateOneById,
  deleteOneById,
};
