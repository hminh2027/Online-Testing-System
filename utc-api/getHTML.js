const md5 = require("md5");

const { getSessionId } = require("./getSessionId");
const { getCookie } = require("./getCookie");
const { getRequest, postRequest } = require("./request");

const originUrl = "https://qldt.utc.edu.vn/CMCSoft.IU.Web.Info";

module.exports.getHTML = async (username, password, page, credential) => {
  let html;
  const hashedPasword = md5(password);
  const sessionId = await getSessionId();

  const loginUrl = `${originUrl}/${sessionId}/login.aspx`;
  const url = `${originUrl}/${sessionId}/${page}`;

  const cookie = await getCookie(username, hashedPasword, loginUrl);
  if (credential) html = await postRequest(cookie, url, credential);
  else html = await getRequest(cookie, url);

  return html;
};
