const { prisma } = require("../database/prisma-client");

async function createOne({ content, url = "", userId, recipents, notiType }) {
  const noti = await prisma.notification.create({
    data: {
      content,
      url,
      User: {
        connect: { id: userId },
      },
      notiType,
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

function getManyByUserId(userId) {
  return prisma.user_Notification.findMany({
    where: { userId },
    include: { Notification: { include: { User: true } } },
    orderBy: { Notification: { createdAt: "desc" } },
  });
}

function patchOneById(id, { isRead }) {
  return prisma.user_Notification.update({
    where: { id },
    data: {
      isRead,
    },
  });
}

function deleteOneById(id) {
  return prisma.user_Notification.delete({ where: { id } });
}

module.exports = {
  createOne,
  getManyByUserId,
  patchOneById,
  deleteOneById,
};
