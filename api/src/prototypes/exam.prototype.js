const { faker } = require("@faker-js/faker");

function examPrototype() {
  return {
    title: "Bài kiểm tra " + faker.company.name(),
    description: "Mô tả bài kiểm tra " + faker.lorem.paragraph(),
    duration: Math.floor(Math.random() * 60) + 1,
    numberOfQuestionDisplayed: Math.floor(Math.random() * 10) + 1,
    teacherId: 1,
  };
}

module.exports = examPrototype;
