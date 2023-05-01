const { prisma } = require("./prisma-client");
const { generateDummyData } = require("../utils");
const {
  authService,
  testService,
  questionService,
  answerService,
} = require("../services");
const { logger } = require("../config");
const { testPrototype } = require("../prototypes/test.prototype");
const { userPrototype } = require("../prototypes/user.prototype");
const { questionPrototype } = require("../prototypes/question.prototype");

async function main() {
  logger.info("Seeding...");
  // CATEGORY
  await prisma.category.deleteMany();
  await prisma.category.createMany({
    data: [
      { name: "Giáo dục" },
      { name: "Khoa học" },
      { name: "Giải trí" },
      { name: "Công nghệ" },
      { name: "Ngôn ngữ" },
    ],
  });
  logger.info("Category seeded successfully");
  // USER
  const users = generateDummyData(5, userPrototype);
  await prisma.user.deleteMany();

  for (user of users) {
    await authService.signup({
      password: user.password,
      email: user.email,
      name: user.name,
    });
  }

  logger.info("User seeded successfully");

  // TEST
  const tests = generateDummyData(10, testPrototype);
  await prisma.test.createMany({ data: tests });

  logger.info("Test seeded successfully");

  // QUESTION & ANSWER;
  const testsId = await (await prisma.test.findMany()).map((test) => test.id);
  for (const id of testsId) {
    const qns = generateDummyData(5, questionPrototype);

    for (const q of qns) {
      const question = await questionService.createOne({ ...q, testId: id });
      q.answers.forEach(async (answer) => {
        await answerService.createOne({ ...answer, questionId: question.id });
      });
    }
  }

  logger.info("Question seeded successfully");
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
