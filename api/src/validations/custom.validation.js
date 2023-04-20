const password = (value, helpers) => {
  if (!value.match(/\d/) || !value.match(/[^\w ]/g)) {
    return helpers.message(
      "password must contain at least 1 number and 1 special char"
    );
  }

  return value;
};

module.exports = {
  password,
};
