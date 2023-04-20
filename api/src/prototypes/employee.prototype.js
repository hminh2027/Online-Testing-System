const { faker } = require("@faker-js/faker");
const ROLE = require("../constants/role");
// const

function employeePrototype(index) {
  return {
    employeeNumber: index + 1,
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    email: faker.internet.email(),
    extension: faker.date.future(3),
    officeCode: faker.random.alphaNumeric(10),
    reportsTo: null,
    jobTitle: faker.helpers.arrayElement(Object.values(ROLE)),
  };
}

console.log(faker.helpers.arrayElement(Object.values(ROLE)));

module.exports = { employeePrototype };
