const ROLE = require("./role");
const RESOURCE = require("./resource");
const ACTION = require("./action");

const PERMISSIONS = [
  {
    name: ROLE.PRESIDENT,
    permissions: [
      `${RESOURCE.EMPLOYEE}:${ACTION.ALL}`,
      `${RESOURCE.CUSTOMER}:${ACTION.ALL}`,
    ],
  },
  {
    name: ROLE.MANAGER,
    permissions: [
      `${RESOURCE.EMPLOYEE}:${ACTION.READ}`,
      `${RESOURCE.EMPLOYEE}:${ACTION.CREATE}`,
      `${RESOURCE.EMPLOYEE}:${ACTION.UPDATE}`,
      `${RESOURCE.CUSTOMER}:${ACTION.ALL}`,
    ],
  },
  {
    name: ROLE.LEADER,
    permissions: [
      `${RESOURCE.EMPLOYEE}:${ACTION.READ}`,
      `${RESOURCE.CUSTOMER}:${ACTION.ALL}`,
    ],
  },
  {
    name: ROLE.PRESIDENT,
    permissions: [
      `${RESOURCE.CUSTOMER}:${ACTION.READ}`,
      `${RESOURCE.CUSTOMER}:${ACTION.CREATE}`,
    ],
  },
];

module.exports = PERMISSIONS;
