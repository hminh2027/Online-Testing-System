import { axiosInstance } from "../../../lib";

const url = "test";

export const testApi = {
  // create: async (data) => {
  //   try {
  //     return await axiosInstance.post(`${url}/login`, data);
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  getALlWithCategory: () => {
    try {
      return axiosInstance.get(`${url}/category`);
    } catch (error) {
      throw error;
    }
  },
  getAllByCategoryId: async (categoryId) => {
    try {
      const result = await axiosInstance.get(`${url}/category/${categoryId}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
