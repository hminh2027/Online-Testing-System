const { prisma } = require("../database/prisma-client");

async function createOne(data) {
  return prisma.question.create({
    data: {
      index: data.index,
      text: data.text,
      is_multiple: data.isMultiple,
      image_url: data.imageUrl,
      score: data.score,
      testCode: data.testCode,
    },
  });
}

async function findOne(testCode, questionIndex) {
  return prisma.question.findFirst({
    where: {
      testCode,
      index: questionIndex,
    },
  });
}

async function updateOne(testCode, questionIndex, data) {
  const question = await findOne(testCode, questionIndex);

  if (!question)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy câu hỏi này!");

  return prisma.question.update({
    data: {
      index: data.index,
      text: data.text,
      is_multiple: data.isMultiple,
      image_url: data.imageUrl,
      score: data.score,
    },
    where: { id: question.id },
  });
}

async function updateIndexesByQuestionId(testCode, questions) {
  console.log(questions);
  prisma.question.deleteMany({
    where: { id: { in: questions.map((question) => question.id) } },
  });
  return Promise.all(
    questions.map((question) =>
      prisma.question.create({
        data: question,
      })
    )
  );
}

async function deleteOne(testCode, questionIndex) {
  const question = await findOne(testCode, questionIndex);

  if (!question)
    throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy câu hỏi này!");

  return prisma.question.delete({
    where: { id: question.id },
  });
}

module.exports = {
  createOne,
  findOne,
  updateOne,
  deleteOne,
  updateIndexesByQuestionId,
};
