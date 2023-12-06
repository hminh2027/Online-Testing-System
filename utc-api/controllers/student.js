const { getHTML } = require("../getHTML");
const { getStudent } = require("../htmlHandler");

module.exports.getStudent = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ data: "", error: "Username or password not found!" });

  try {
    const html = await getHTML(
      username,
      password,
      "StudentProfileNew/HoSoSinhVien.aspx"
    );
    const data = await getStudent(html);

    return res.status(200).json({ data, error: "" });
  } catch (err) {
    console.log({ err });
    return res.status(err.status).json({ data: "", error: err.body });
  }
};
