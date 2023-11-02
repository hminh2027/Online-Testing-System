const { prisma } = require("../database/prisma-client");

function createOne(data) {
  return prisma.exam.create({
    data: {
      title: data.title,
      description: data.description,
      duration: +data.duration,
      User: {
        connect: {
          id: data.teacherId,
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

async function getOneById(id, { teacherId }) {
  const exam = await prisma.exam.findUnique({
    where: { id, teacherId },
    include: {
      Question: {
        include: { Answer: true },
        orderBy: { index: "asc" },
      },
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
  });
}

async function updateOneById(id, data) {
  return prisma.exam.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      duration: +data.duration,
    },
  });
}

async function deleteOneById(id) {
  return prisma.test.delete({ where: { id } });
}

module.exports = {
  createOne,
  getOneById,
  getManyByTeacherId,
  updateOneById,
  deleteOneById,
};
