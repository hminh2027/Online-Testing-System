const { prisma } = require("../database/prisma-client");

async function createOne({ content, userId, postId }) {
  return prisma.comment.create({
    data: {
      content,
      post_id: postId,
      user_id: userId,
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
