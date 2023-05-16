const { prisma } = require("../database/prisma-client");
const { customAlphabet } = require("nanoid");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const moment = require("moment");
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function createOne(data) {
  return prisma.test.create({
    data: {
      code: customAlphabet(ALPHABET, 6)(),
      title: data.title,
      description: data.description,
      duration: +data.duration,
      start_time: new Date(data.startTime),
      end_time: data.endTime ? new Date(data.endTime) : null,
      attempt_limit: +data.attemptLimit,
      is_public: data.isPublic,
      is_mix: data.isMix,
      is_show_answer: data.isShowAnswer,
      is_camera_required: data.isCameraRequired,
      User: {
        connect: {
          id: data.userId,
        },
      },
      Category: {
        connect: {
          id: data.categoryId,
        },
      },
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
      attempts: {
        include: {
          User: true,
        },
      },
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

async function getAllByUserId(userId) {
  return prisma.test.findMany({
    where: { userId },
    include: { Category: true },
  });
}

async function updateOneByCode(testCode, data) {
  const test = await prisma.test.findFirst({
    where: { code: testCode, userId: data.userId },
  });

  if (!test)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy bài kiểm tra");
  if (moment(test.start_time).isBefore(moment()))
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Không được phép cập nhật bài kiểm tra đã diễn ra!"
    );

  return prisma.test.update({
    where: { code: test.code },
    data: {
      title: data.title,
      description: data.description,
      duration: +data.duration,
      start_time: new Date(data.startTime),
      end_time: data.endTime ? new Date(data.endTime) : null,
      attempt_limit: +data.attemptLimit,
      is_public: data.isPublic,
      is_mix: data.isMix,
      is_show_answer: data.isShowAnswer,
      is_camera_required: data.isCameraRequired,
      Category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
  });
}

async function deleteOneByCode(testCode, userId) {
  const test = await prisma.test.findFirst({
    where: { code: testCode, userId },
  });

  if (!test)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy bài kiểm tra");

  return prisma.test.delete({ where: { code: test.code } });
}

module.exports = {
  createOne,
  getAllPublic,
  getAllByCategoryId,
  getAllByUserId,
  getOneByCode,
  updateOneByCode,
  deleteOneByCode,
};
