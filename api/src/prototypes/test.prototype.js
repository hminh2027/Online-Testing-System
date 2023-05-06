const { faker } = require("@faker-js/faker");
const { customAlphabet } = require("nanoid");

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function testPrototype() {
  return {
    code: customAlphabet(ALPHABET, 6)(),
    title: "Bài kiểm tra " + faker.lorem.words(3),
    description: "Mô tả bài kiểm tra " + faker.lorem.paragraph(),
    duration: 60,
    number_of_questions: 5,
    start_time: faker.date.between("2023-03-01", "2023-06-01"),
    end_time: faker.date.between("2023-03-01", "2023-06-01"),
    attempt_limit: Math.floor(Math.random() * 5) + 1,
    is_public: Math.random() < 0.5,
    is_mix: Math.random() < 0.5,
    is_show_answer: Math.random() < 0.5,
    categoryId: Math.floor(Math.random() * 5) + 1,
    userId: Math.floor(Math.random() * 5) + 1,
  };
}

module.exports = { testPrototype };
