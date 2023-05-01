import { axiosInstance } from "../../../lib";

const url = "test";

export const testApi = {
  create: async (data) => {
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
      return error;
    }
  },
  getMe: async () => {
    const result = await axiosInstance.post(`users/me`);
    return result;
  },
  refreshToken: async () => {
    const result = await axiosInstance.post("auth/token");
    return result;
  },
};
