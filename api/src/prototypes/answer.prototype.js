const { faker } = require("@faker-js/faker");

function answerPrototype(index) {
  return {
    index: index + 1,
    content: faker.lorem.words(3),
    isCorrect: Math.random() < 0.5,
  };
}

module.exports = answerPrototype;
