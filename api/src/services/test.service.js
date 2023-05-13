const { prisma } = require("../database/prisma-client");
const { customAlphabet } = require("nanoid");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function createOne(data) {
  return prisma.test.create({
    data: {
      code: customAlphabet(ALPHABET, 6)(),
      title: data.title,
      description: data.description,
      duration: +data.duration,
      number_of_questions: +data.numberOfQuestions,
      start_time: new Date(data.startTime),
      end_time: new Date(data.endTime),
      attempt_limit: +data.attemptLimit,
      is_public: data.isPublic,
      is_mix: data.isMix,
      is_show_answer: data.isShowAnswer,
      is_camera_required: data.isCameraRequired,
      categoryId: data.categoryId,
      userId: 1,
    },
  });
}

async function getAllPublic() {
  return prisma.test.findMany({
    include: {
      User: true,
    },
    where: { is_public: true, end_time: { gt: Date.now() } },
  });
}

async function getOneByCode(code) {
  const test = await prisma.test.findUnique({
    where: { code },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
      attempts: true,
      Category: true,
    },
  });
  if (!test)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Không tìm thấy bài kiểm tra này!"
    );

  return test;
}

async function getAllByCategoryId(categoryId) {
  return prisma.test.findMany({
    where: { categoryId },
  });
}

async function updateOneById(id, data) {
  return prisma.test.update({ where: { id } }, data);
}

module.exports = {
  createOne,
  updateOneById,
  getAllPublic,
  getAllByCategoryId,
  getOneByCode,
};
