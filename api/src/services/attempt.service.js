const { prisma } = require("../database/prisma-client");

async function createOne({ userId, testCode }) {
  return prisma.attempt.create({
    data: {
      start_time: new Date.now(),
      end_time: null,
      score: null,
      userId,
      testCode,
    },
  });
}

module.exports = {
  createOne,
};
