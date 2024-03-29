const { prisma } = require("../database/prisma-client");

function createOne({ content, imageUrl = "", userId, classCode }) {
  return prisma.post.create({
    data: {
      content,
      imageUrl,
      userId,
      classCode,
    },
  });
}

function getManyByClassCode(classCode) {
  return prisma.post.findMany({
    where: { classCode },
    include: {
      Comment: {
        include: { User: { select: { fullname: true, imageUrl: true } } },
      },
      User: {
        select: { fullname: true, imageUrl: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

function updateOneById(id, { content, imageUrl, userId }) {
  return prisma.post.update({
    where: { id, userId },
    data: {
      content,
      imageUrl,
    },
  });
}

function deleteOneById(id, userId) {
  return prisma.post.delete({ where: { id, userId } });
}

module.exports = {
  createOne,
  getManyByClassCode,
  updateOneById,
  deleteOneById,
};
