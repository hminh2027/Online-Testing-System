const httpStatus = require("http-status");
const { prisma } = require("../database/prisma-client");
const { ApiError } = require("../utils");

async function createOne(data) {
  return prisma.answer.create({
    data: {
      index: data.index,
      text: data.text,
      is_correct: data.isCorrect,
      questionId: data.questionId,
    },
  });
}

// Tim theo id hay index?
async function findOne(questionId, answerIndex) {
  return prisma.answer.findFirst({
    where: {
      questionId,
      index: answerIndex,
    },
  });
}

async function updateOne(questionId, answerIndex, data) {
  const answer = await findOne(questionId, answerIndex);

  if (!answer)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy đáp án này!");

  return prisma.answer.update({
    data: {
      text: data.text,
      is_correct: data.isCorrect,
      index: data.index,
    },
    where: { id: answer.id },
  });
}

async function deleteOne(questionId, answerIndex) {
  const answer = await findOne(questionId, answerIndex);

  if (!answer)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy đáp án này!");

  return prisma.answer.delete({
    where: { id: answer.id },
  });
}

module.exports = {
  createOne,
  updateOne,
  deleteOne,
};
