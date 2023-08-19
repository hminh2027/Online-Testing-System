const { prisma } = require("../database/prisma-client");

async function createOne({ content, image_url = "", userId, classId }) {
  return prisma.post.create({
    data: {
      content,
      image_url,
      user_id: userId,
      class_id: classId,
    },
  });
}

async function getOneById(id) {
  return prisma.post.findUnique({
    where: { id },
    include: { Comment },
  });
}

async function getManyByClassId(classId) {
  return prisma.post.findMany({
    where: { class_id: classId },
  });
}

async function updateOneById(id, { content }) {
  return prisma.post.update({
    where: { id },
    data: {
      content,
    },
  });
}

async function deleteOneById(id) {
  return prisma.post.delete({ where: { id } });
}

module.exports = {
  createOne,
  getOneById,
  getManyByClassId,
  updateOneById,
  deleteOneById,
};
