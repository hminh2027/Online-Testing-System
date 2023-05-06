import { axiosInstance } from "../../../lib";

const url = "auth";

export const authApi = {
  login: async (data) => {
    try {
      return await axiosInstance.post(`${url}/login`, data);
    } catch (error) {
      throw error;
    }
  },
  signup: (data) => {
    try {
      return axiosInstance.post(`${url}/signup`, data);
    } catch (error) {
      throw error;
    }
  },
  getMe: () => {
    try {
      return axiosInstance.get(`${url}/me`);
    } catch (error) {
      throw error;
    }
  },
  // refreshToken: async () => {
  //   const result = await axiosInstance.post("auth/token");
  //   return result;
  // },
};
