import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(import.meta.env.VITE_TOKEN_KEY || "API_KEY") || null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(onResponseSuccess, (error) => {
//   // Handle API error here
//   if (error.response?.status !== 401) {
//     const errMessage = error.response?.data || error?.response || error;
//     return Promise.reject(errMessage);
//   }
//   return Promise.reject(error);
// });
