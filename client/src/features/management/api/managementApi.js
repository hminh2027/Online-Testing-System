import { axiosInstance } from "../../../lib";

const url = "test";

export const managementApi = {
  getALlWithCategory: () => {
    return axiosInstance.get(`${url}/category`);
  },
  createTest: (data) => {
    return axiosInstance.post(`${url}`, data);
  },
  getOneByCode: (testCode) => {
    return axiosInstance.get(`${url}/${testCode}`);
  },
  updateQuestions: (testCode, questions) => {
    return axiosInstance.patch(`${url}/${testCode}/questions`, questions);
  },
  createQuestion: (testCode, question) => {
    return axiosInstance.post(`${url}/${testCode}/questions`, question);
  },
};
