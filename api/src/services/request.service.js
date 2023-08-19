const { RequestStatus } = require("@prisma/client");
const { prisma } = require("../database/prisma-client");

async function createOne({ notiId }) {
  return prisma.request.create({
    data: {
      status: RequestStatus.pending,
      Notification: {
        connect: { id: notiId },
      },
    },
  });
}

async function patchOneById(id, { status }) {
  return prisma.request.update({
    where: { id },
    data: {
      status,
    },
  });
}

module.exports = {
  createOne,
  patchOneById,
};
