const { prisma } = require("../database/prisma-client");

async function getManyById(id) {
  return prisma.userClass.findMany({
    where: { user_class_id: id },
    select: { User, Class },
  });
}

module.exports = {
  getManyById,
};
