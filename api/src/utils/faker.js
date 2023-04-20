function generateDummyData(quantity, prototypeFn) {
  let initArray = [];
  for (let i = 0; i < quantity; i++) {
    initArray.push(prototypeFn(i));
  }
  return initArray;
}

module.exports = { generateDummyData };
