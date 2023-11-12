const { prisma } = require("./prisma-client");
const { logger } = require("../config");

const { passwordService } = require("../services/");

const user = require("./mock/user.json");
const classRoom = require("./mock/class.json");
const exam = require("./mock/exam.json");
const question = require("./mock/question.json");
const answer = require("./mock/answer.json");

const seedUsers = async () => {
  const createdPromises = user.map(
    async (item) =>
      await prisma.user.create({
        data: {
          ...item,
          password: await passwordService.hashPassword(item.password),
        },
      })
  );

  await Promise.all(createdPromises);

  logger.info("User seeded successfully");
};

const seedClasses = async (teacherId) => {
  const mappedCLassrooms = classRoom.map((item) => ({
    ...item,
    teacherId,
  }));
  await prisma.class.createMany({ data: mappedCLassrooms });

  logger.info("Class seeded successfully");
};

const seedExams = async (teacherId) => {
  const mappedExams = exam.map((item) => ({
    ...item,
    teacherId,
  }));
  await prisma.exam.createMany({ data: mappedExams });

  logger.info("Exam seeded successfully");
};

const seedQuestions = async () => {
  await prisma.question.createMany({ data: question });
  logger.info("Question seeded successfully");
};

const seedAnswers = async () => {
  await prisma.answer.createMany({ data: answer });
  logger.info("Data seeding finished!");
};

async function main() {
  logger.info("Seeding...");

  // USER
  await seedUsers();

  const { id: teacherId } = await prisma.user.findUnique({
    where: { email: "teacher@gmail.com" },
  });

  // CLASS
  await seedClasses(teacherId);

  // EXAM
  await seedExams(teacherId);

  // QUESTION & ANSWER
  await seedQuestions();
  await seedAnswers();
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
