import { axiosInstance } from "../../../lib";

const url = "attempt";

export const attemptApi = {
  create: async ({ testCode }) => {
    try {
      return await axiosInstance.post(`${url}/`, { testCode });
    } catch (error) {
      throw error;
    }
  },
  getOneByCode: async (testCode) => {
    try {
      return await axiosInstance.get(`${url}/${testCode}`);
    } catch (error) {
      throw error;
    }
  },
  updateOneOngoing: async (attemptId) => {
    try {
      return await axiosInstance.put(`${url}`, { attemptId });
    } catch (error) {
      throw error;
    }
  },
};
