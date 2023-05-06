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

module.exports = {
  createOne,
};
