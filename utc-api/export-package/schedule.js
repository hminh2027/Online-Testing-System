// export const getAllSchedule = async (username, password) => {
//   if (!username || !password)
//     return { data: "", error: "Username or password not found!" };
//   try {
//     const rs = await axios.post("http://theutcapi.herokuapp.com/schedule", {
//       username,
//       password,
//     });

//     return { data: rs.data.data, error: "" };
//   } catch (error) {
//     return { data: "", error: error.response.data.error };
//   }
// };

// export const getScheduleOfToday = async (username, password) => {
//   if (!username || !password)
//     return { data: "", error: "Username or password not found!" };
//   try {
//     const rs = await axios.post(
//       "http://theutcapi.herokuapp.com/schedule/today",
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

// export const getScheduleOfDay = async (username, password, date) => {
//   if (!username || !password)
//     return { data: "", error: "Username or password not found!" };
//   if (!date) return { data: "", error: "Date not found!" };
//   try {
//     const rs = await axios.post(
//       `http://theutcapi.herokuapp.com/schedule/day?year=${date.getFullYear()}&month=${date.getMonth()}&day=${date.getDate()}`,
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
