const { faker } = require("@faker-js/faker");

function questionPrototype(index) {
  return {
    index: index + 1,
    content: faker.lorem.words(3) + "?",
    imageUrl: "",
    score: 1,
    examId: 1,
  };
}

module.exports = questionPrototype;
