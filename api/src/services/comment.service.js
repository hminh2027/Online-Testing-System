const { prisma } = require("../database/prisma-client");

async function createOne({ content, userId, postId }) {
  return prisma.comment.create({
    data: {
      content,
      postId,
      userId,
    },
  });
}

async function updateOneById(id, { content }) {
  return prisma.comment.update({
    where: { id },
    data: {
      content,
    },
  });
}

async function deleteOneById(id) {
  return prisma.comment.delete({ where: { id } });
}

module.exports = {
  createOne,
  updateOneById,
  deleteOneById,
};
