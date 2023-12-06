const { getHTML } = require("../getHTML");
const { getStudent: getStudentHTML } = require("../htmlHandler");

const getStudent = async (username, password) => {
  if (!username || !password)
    return { data: "", error: "Username or password not found!" };
  try {
    const html = await getHTML(
      username,
      password,
      "StudentProfileNew/HoSoSinhVien.aspx"
    );
    const data = await getStudentHTML(html);

    return data;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getStudent,
};
