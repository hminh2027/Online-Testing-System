const { prisma } = require("../database/prisma-client");

async function createOne(data) {
  return prisma.question.create({
    data: {
      index: data.index,
      content: data.content,
      imageUrl: data.imageUrl,
      score: data.score,
      // examId: data.examId,
      Exam: {
        connect: { id: data.examId },
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
  return prisma.question.findFirst({
    where: { id },
  });
}

async function getManyByExamId(examId) {
  return prisma.question.findFirst({
    where: { examId },
  });
}

async function updateOneById(id, data) {
  const question = await getOneById(id);

  if (!question)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy câu hỏi này!");

  return prisma.question.update({
    data: {
      index: data.index,
      content: data.content,
      image_url: data.imageUrl,
      score: data.score,
    },
    where: { id },
  });
}

async function deleteOneById(id) {
  const question = await getOneById(id);

  if (!question)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy câu hỏi này!");

  return prisma.question.delete({
    where: { id },
  });
}

module.exports = {
  createOne,
  createMany,
  getOneById,
  getManyByExamId,
  updateOneById,
  deleteOneById,
};
