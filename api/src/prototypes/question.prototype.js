const { faker } = require("@faker-js/faker");

function questionPrototype(index) {
  const answers = [];
  const length = Math.floor(Math.random() * 6) + 2; //2 -> 7
  const correctIndex = Math.floor(Math.random() * length) + 1; // 1 -> n
  for (let i = 0; i < length; i++) {
    answers.push({
      index: i + 1,
      text: faker.lorem.words(1),
      isCorrect: correctIndex === i + 1 ? true : false,
    });
  }
  return {
    index: index + 1,
    text: faker.lorem.words(3) + "?",
    isMultiple: false,
    score: 10,
    answers,
  };
}

module.exports = { questionPrototype };
