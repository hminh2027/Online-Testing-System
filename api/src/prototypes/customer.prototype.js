const { faker } = require("@faker-js/faker");

function customerPrototype(index) {
  return {
    customerNumber: index + 1,
    customerName: faker.name.fullName(),
    contactLastName: faker.name.lastName(),
    contactFirstName: faker.name.firstName(),
    phone: faker.phone.number(),
    addressLine1: faker.address.streetAddress(),
    addressLine2: null,
    city: faker.address.cityName(),
    state: faker.address.state(),
    postalCode: faker.address.zipCode(),
    country: faker.address.country(),
    salesRepEmployeeNumber: index + 1,
    creditLimit: 10000,
  };
}

module.exports = { customerPrototype };
