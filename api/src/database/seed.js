const { prisma } = require("./prisma-client");
const { generateDummyData } = require("../utils");
const { authService, classService } = require("../services");
const { logger } = require("../config");
const {
  userPrototype,
  classPrototype,
  examPrototype,
} = require("../prototypes");

async function main() {
  logger.info("Seeding...");
  // USER
  const users = generateDummyData(5, userPrototype);
  await prisma.user.deleteMany();
  await authService.signup({
    password: "123456",
    email: "teacher@gmail.com",
    fullname: "Minh Mẫn",
    isTeacher: true,
  });
  for (user of users) {
    await authService.signup({
      password: user.password,
      email: user.email,
      fullname: user.fullname,
    });
  }

  logger.info("User seeded successfully");

  // CLASS
  const classes = generateDummyData(10, classPrototype);
  await prisma.class.deleteMany();
  const classCode = [];
  for (_class of classes) {
    const classRoom = await classService.createOne({
      name: _class.name,
      description: _class.description,
      imageUrl: _class.imageUrl,
      password: _class.password,
      isStudentApprovalLeave: _class.isStudentApprovalLeave,
      teacherId: _class.teacherId,
    });
    classCode.push(classRoom.code);
  }

  logger.info("Class seeded successfully");

  // EXAM
  const exams = generateDummyData(5, examPrototype);
  await prisma.exam.createMany({ data: exams });

  logger.info("Exam seeded successfully");

  // // QUESTION & ANSWER;
  // const testsCode = await (
  //   await prisma.test.findMany()
  // ).map((test) => test.code);
  // for (const code of testsCode) {
  //   const qns = generateDummyData(10, questionPrototype);

  //   for (const q of qns) {
  //     const question = await questionService.createOne({
  //       ...q,
  //       testCode: code,
  //     });
  //     q.answers.forEach(async (answer) => {
  //       await answerService.createOne({ ...answer, questionId: question.id });
  //     });
  //   }
  // }

  // logger.info("Question seeded successfully");
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
