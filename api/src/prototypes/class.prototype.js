const { faker } = require("@faker-js/faker");

function classPrototype() {
  return {
    name: "Lớp học tại đất nước " + faker.location.country(),
    description: "Mô tả lớp học siêu dài " + faker.lorem.paragraph(),
    imageUrl: "",
    password: Math.random() < 0.5 ? "123456" : "",
    isStudentApprovalEnter: Math.random() < 0.5,
    isStudentApprovalLeave: Math.random() < 0.5,
    isStudentPostAllowed: Math.random() < 0.5,
    teacherId: 1,
  };
}

module.exports = classPrototype;
