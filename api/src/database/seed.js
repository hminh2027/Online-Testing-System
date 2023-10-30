const { prisma } = require("./prisma-client");
const { logger } = require("../config");

const user = require("./mock/user.json");
const classRoom = require("./mock/class.json");
const exam = require("./mock/exam.json");
const question = require("./mock/question.json");
const answer = require("./mock/answer.json");

async function main() {
  logger.info("Seeding...");
  // USER
  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: user });

  logger.info("User seeded successfully");

  // CLASS
  await prisma.class.deleteMany();
  await prisma.class.createMany({ data: classRoom });

  logger.info("Class seeded successfully");

  // EXAM
  await prisma.exam.deleteMany();
  await prisma.exam.createMany({ data: exam });

  logger.info("Exam seeded successfully");

  // QUESTION & ANSWER
  await prisma.question.deleteMany();
  await prisma.question.createMany({ data: question });
  await prisma.answer.deleteMany();
  await prisma.answer.createMany({ data: answer });

  logger.info("Question seeded successfully");
  logger.info("Data seeding finished!");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
