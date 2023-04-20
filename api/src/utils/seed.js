const { customerPrototype } = require("../prototypes/customer.prototype");
const { employeePrototype } = require("../prototypes/employee.prototype");
const { generateDummyData } = require("./faker");
const { writeFile } = require("./file");

(function seeding() {
  const customers = generateDummyData(20, customerPrototype);
  const employees = generateDummyData(20, employeePrototype);

  writeFile(customers, "customers.json");
  writeFile(employees, "employees.json");
})();
