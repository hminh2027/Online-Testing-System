const { faker } = require("@faker-js/faker");

function userPrototype(index) {
  return {
    username: faker.internet.userName(),
    password: "123456",
    employeeEmployeeNumber: index + 1,
  };
}

module.exports = { userPrototype };
