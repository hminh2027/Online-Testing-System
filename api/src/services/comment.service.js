const { prisma } = require("../database/prisma-client");

function createOne({ content, userId, postId }) {
  return prisma.comment.create({
    data: {
      content,
      postId,
      userId,
    },
  });
}

function getManyByPostId(postId) {
  return prisma.comment.findMany({
    where: { postId },
    include: { User: true },
  });
}

function updateOneById(id, { content }) {
  return prisma.comment.update({
    where: { id },
    data: {
      content,
    },
  });
}

function deleteOneById(id) {
  return prisma.comment.delete({ where: { id } });
}

module.exports = {
  createOne,
  getManyByPostId,
  updateOneById,
  deleteOneById,
};
