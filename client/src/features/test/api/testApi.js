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
  getAllByCategoryId: (categoryId) => {
    try {
      return axiosInstance.get(`${url}/category/${categoryId}`);
    } catch (error) {
      throw error;
    }
  },
  getOneById: (testId) => {
    try {
      return axiosInstance.get(`${url}/${testId}`);
    } catch (error) {
      throw error;
    }
  },
};
