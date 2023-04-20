const fs = require("fs");
const path = require("path");

const FOLDER_PATH = "src/data/";

function writeFile(content, fileName) {
  if (!fs.existsSync(FOLDER_PATH)) {
    fs.mkdirSync(FOLDER_PATH);
  }

  fs.writeFile(
    path.join(FOLDER_PATH, fileName),
    JSON.stringify(content),
    (err) => {
      if (err) {
        console.error(err);
      }
      console.log("The file has been saved!");
    }
  );
}

function readFile(fileName) {
  let data = fs.readFileSync(path.join(FOLDER_PATH, fileName));
  return JSON.parse(data);
}

module.exports = { writeFile, readFile };
