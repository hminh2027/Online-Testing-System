const { prisma } = require("./prisma-client");
const { logger } = require("../config");

const user = require("./mock/user.json");
const classRoom = require("./mock/class.json");

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
  // const exams = generateDummyData(5, examPrototype);
  // await prisma.exam.createMany({ data: exams });

  logger.info("Exam seeded successfully");

  // QUESTION & ANSWER
  // const questions = generateDummyData(10, questionPrototype);
  // const answers = generateDummyData(4, answerPrototype);

  // questions.forEach(async (q) => {
  //   const { id: questionId } = await questionService.createOne(q);
  //   // const mappedAnswer = answers.map((answer) => ({
  //   //   ...answer,
  //   //   questionId,
  //   // }));

  //   // await answerService.createMany(mappedAnswer);
  // });

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
