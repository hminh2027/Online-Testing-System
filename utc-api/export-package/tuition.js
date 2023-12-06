//  const getTuition = async (username, password) => {
//   if (!username || !password)
//     return { data: "", error: "Username or password not found!" };
//   try {
//     const rs = await axios.post(`http://theutcapi.herokuapp.com/tuition`, {
//       username,
//       password,
//     });

//     return { data: rs.data.data, error: "" };
//   } catch (error) {
//     return { data: "", error: error.response.data.error };
//   }
// };

//  const getPaidTuition = async (username, password) => {
//   if (!username || !password)
//     return { data: "", error: "Username or password not found!" };
//   try {
//     const rs = await axios.post(`http://theutcapi.herokuapp.com/tuition/paid`, {
//       username,
//       password,
//     });

//     return { data: rs.data.data, error: "" };
//   } catch (error) {
//     return { data: "", error: error.response.data.error };
//   }
// };

//  const getTuitionDebt = async (username, password) => {
//   if (!username || !password)
//     return { data: "", error: "Username or password not found!" };
//   try {
//     const rs = await axios.post(`http://theutcapi.herokuapp.com/tuition/debt`, {
//       username,
//       password,
//     });

//     return { data: rs.data.data, error: "" };
//   } catch (error) {
//     return { data: "", error: error.response.data.error };
//   }
// };
