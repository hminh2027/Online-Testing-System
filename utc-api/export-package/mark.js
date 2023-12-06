//  const getMarks = async (username, password, grade) => {
//   if (!username || !password)
//     return { data: "", error: "Username or password not found!" };
//   try {
//     const rs = await axios.post(
//       `http://theutcapi.herokuapp.com/mark/${grade ? grade : ""}`,
//       {
//         username,
//         password,
//       }
//     );

//     return { data: rs.data.data, error: "" };
//   } catch (error) {
//     return { data: "", error: error.response.data.error };
//   }
// };

//  const getGPA = async (username, password, year) => {
//   if (!username || !password)
//     return { data: "", error: "Username or password not found!" };
//   try {
//     const rs = await axios.post(
//       `http://theutcapi.herokuapp.com/mark/gpa/${year ? year : ""}`,
//       {
//         username,
//         password,
//       }
//     );

//     return { data: rs.data.data, error: "" };
//   } catch (error) {
//     return { data: "", error: error.response.data.error };
//   }
// };

// module.exports = {
//   getMarks,
//   getGPA,
// };
