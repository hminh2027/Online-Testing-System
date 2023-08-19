const { prisma } = require("../database/prisma-client");

async function createOne({ content, url = "", userId, requestId }) {
  return prisma.notification.create({
    data: {
      content,
      url,
      user_id: userId,
      request_id: requestId,
      User: {
        connect: { id: userId },
      },
      Request: {
        connect: { id: requestId },
      },
    },
  });
}

async function getManyByUserId({ userId }) {
  return prisma.user_Notification.findMany({
    where: { user_id: userId },
  });
}

async function patchOneById(id, { isRead }) {
  return prisma.user_Notification.update({
    where: { id },
    data: {
      is_read: isRead,
    },
  });
}

async function deleteOneById(id) {
  return prisma.user_Notification.delete({ where: { id } });
}

module.exports = {
  createOne,
  getManyByUserId,
  patchOneById,
  deleteOneById,
};
