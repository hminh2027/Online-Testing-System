const { v4 } = require("uuid");

function generateUniqueId(length) {
  const uniqueId = v4().replace("-", "").toUpperCase().slice(0, length);
  return uniqueId;
}

module.exports = generateUniqueId;
