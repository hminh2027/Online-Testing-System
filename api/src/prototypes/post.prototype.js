const { faker } = require("@faker-js/faker");

function postPrototype(index) {
  return {
    classCode: "",
    content: "",
    imageUrl: "",
  };
}

module.exports = { postPrototype };
