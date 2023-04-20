const ACTION = require("../constants/action");
const RESOURCE = require("../constants/resource");
const ROLE = require("../constants/role");
const { customerPrototype } = require("../prototypes/customer.prototype");
const { employeePrototype } = require("../prototypes/employee.prototype");
const { userPrototype } = require("../prototypes/user.prototype");
const { generateDummyData } = require("../utils/faker");
const { prisma } = require("./prisma-client");

async function main() {
  // ROLES
  for (let key in ROLE) {
    await prisma.role.upsert({
      create: {
        name: ROLE[key],
      },
      update: {
        name: ROLE[key],
      },
      where: {
        name: ROLE[key],
      },
    });
  }

  // EMPLOYEES
  const employees = generateDummyData(20, employeePrototype);
  const customers = generateDummyData(20, customerPrototype);
  const users = generateDummyData(10, userPrototype);
  await prisma.employee.createMany({ data: employees });
  await prisma.customer.createMany({ data: customers });
  await prisma.user.createMany({ data: users });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
