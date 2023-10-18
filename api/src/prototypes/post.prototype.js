const { faker } = require("@faker-js/faker");

function postPrototype(classCode) {
  return {
    classCode,
    content: "Đây là bài viết tự động tạo " + faker.music.songName(),
    imageUrl: "",
  };
}

module.exports = postPrototype;
