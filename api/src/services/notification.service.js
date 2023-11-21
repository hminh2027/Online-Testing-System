const { prisma } = require("../database/prisma-client");

async function createOne({ content, url = "", userId, recipents }) {
  const noti = await prisma.notification.create({
    data: {
      content,
      url,
      User: {
        connect: { id: userId },
      },
    },
  });

  await prisma.user_Notification.createMany({
    data: recipents.map((userId) => ({
      notiId: noti.id,
      userId,
      isRead: false,
    })),
  });

  return noti;
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
