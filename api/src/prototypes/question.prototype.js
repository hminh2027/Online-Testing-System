const { faker } = require("@faker-js/faker");

function questionPrototype(index) {
  return {
    index,
    text: faker.lorem.words(3) + "?",
    isMultiple: false,
    score: 10,
    answers: [
      {
        index: 1,
        text: faker.lorem.words(1),
        isCorrect: true,
      },
      {
        index: 2,
        text: faker.lorem.words(1),
        isCorrect: false,
      },
      {
        index: 3,
        text: faker.lorem.words(1),
        isCorrect: false,
      },
      {
        index: 4,
        text: faker.lorem.words(1),
        isCorrect: false,
      },
    ],
  };
}

module.exports = { questionPrototype };
