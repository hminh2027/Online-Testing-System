const { prisma } = require("../database/prisma-client");
const short = require("short-uuid");

async function createOne(data) {
  const uuid = short().uuid();
  const code = short().fromUUID(uuid).slice(0, 6);

  return prisma.test.create({
    data: {
      title: data.title,
      description: data.description,
      duration: +data.duration,
      number_of_questions: +data.numberOfQuestions,
      start_time: new Date(data.startTime),
      end_time: new Date(data.endTime),
      attempt_limit: +data.attemptLimit,
      pin_code: code,
      is_public: data.isPublic,
      is_mix: data.isMix,
      is_show_answer: data.isShowAnswer,
      categoryId: data.categoryId,
      userId: 1,
    },
  });
}

async function getAllPublic() {
  return prisma.test.findMany({
    where: { is_public: true, end_time: { gt: Date.now() } },
  });
}

async function getOneByPinCode(code) {
  return prisma.test.findUnique({
    where: { pin_code: code },
  });
}

async function getOneById(id) {
  return prisma.test.findUnique({
    where: { id },
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
  getOneByPinCode,
  getAllPublic,
  getAllByCategoryId,
  getOneById,
};
