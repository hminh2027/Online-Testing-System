const { faker } = require("@faker-js/faker");

function userPrototype(index) {
  return {
    email: `student${index}@gmail.com`,
    fullname: faker.person.fullName(),
    password: "123456",
    isTeacher: false,
  };
}

module.exports = { userPrototype };
