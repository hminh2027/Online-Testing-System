const httpStatus = require("http-status");
const { prisma } = require("../database/prisma-client");
const { ApiError } = require("../utils");

async function createOne(data) {
  return prisma.answer.create({
    data: {
      index: data.index,
      content: data.content,
      is_correct: data.isCorrect,
      Question: {
        connect: {
          id: data.questionId,
        },
      },
    },
  });
}

async function createMany(data) {
  // return prisma.question.createMany({
  //   data: {
  //     index: data.index,
  //     content: data.content,
  //     image_url: data.imageUrl,
  //     score: data.score,
  //     Exam: {
  //       connect: { id: data.examId },
  //     },
  //   },
  // });
}

async function getOneById(id) {
  return prisma.answer.findFirst({
    where: { id },
  });
}

async function getManyByQuestionId(questionId) {
  return prisma.answer.findFirst({
    where: { question_id: questionId },
  });
}

async function updateOneById(id, data) {
  const answer = await getOneById(id);

  if (!answer)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy đáp án này!");

  return prisma.answer.update({
    data: {
      content: data.content,
      is_correct: data.isCorrect,
      index: data.index,
    },
    where: { id },
  });
}

async function deleteOneById(id) {
  const answer = await getOneById(id);

  if (!answer)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy đáp án này!");

  return prisma.answer.delete({
    where: { id },
  });
}

module.exports = {
  createOne,
  createMany,
  getManyByQuestionId,
  updateOneById,
  deleteOneById,
};
