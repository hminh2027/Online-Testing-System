const { prisma } = require("../database/prisma-client");

async function createOne(data) {
  return prisma.test.create({
    data: {
      title: data.title,
      description: data.description,
      duration: data.duration,
      number_of_questions: data.numberOfQuestions,
      start_time: data.startTime,
      end_time: data.endTime,
      attempt_limit: data.attemptLimit,
      pin_code: data.pinCode,
      is_public: data.isPublic,
      is_mix: data.isMix,
      is_show_answer: data.isShowAnswer,
      is_login_required: data.isLoginRequired,
      created_at: Date.now(),
    },
  });
}

// async function getOneByEmail({ email }) {
//   return prisma.test.findFirst({
//     where: { email },
//   });
// }

async function getOneByPinCode(pinCode) {
  return prisma.test.findUnique({
    where: { pin_code: pinCode },
  });
}

async function updateOneById(id, data) {
  return prisma.test.update({ where: { id } }, data);
}

module.exports = {
  createOne,
  getOneById,
  updateOneById,
  // getOneByEmail,
};
