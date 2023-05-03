const { faker } = require("@faker-js/faker");
const short = require("short-uuid");

function testPrototype(index) {
  const uuid = short().uuid();
  const code = short().fromUUID(uuid).slice(0, 6);

  return {
    title: "Bài quiz " + faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    duration: 60,
    number_of_questions: 5,
    start_time: faker.date.between("2023-03-01", "2023-06-01"),
    end_time: faker.date.between("2023-03-01", "2023-06-01"),
    pin_code: code,
    attempt_limit: Math.floor(Math.random() * 5) + 1,
    is_public: Math.random() < 0.5,
    is_mix: Math.random() < 0.5,
    is_show_answer: Math.random() < 0.5,
    categoryId: Math.floor(Math.random() * 5) + 1,
    userId: Math.floor(Math.random() * 5) + 1,
  };
}

module.exports = { testPrototype };
