const { faker } = require("@faker-js/faker");

function userPrototype(index) {
  return {
    email: `vhminh202${7 + index}@gmail.com`,
    name: faker.name.lastName(),
    password: "123456",
  };
}

module.exports = { userPrototype };
