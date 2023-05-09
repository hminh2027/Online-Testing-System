import { axiosInstance } from "../../../lib";

const url = "test";

export const managementApi = {
  getALlWithCategory: () => {
    return axiosInstance.get(`${url}/category`);
  },
  createTest: (data) => {
    return axiosInstance.post(`${url}`, data);
  },
};
