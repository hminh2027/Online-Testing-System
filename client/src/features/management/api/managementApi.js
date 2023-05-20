import { axiosInstance } from "../../../lib";

const url = "test";

export const managementApi = {
  getTestByUserId: (id) => {
    return axiosInstance.get(`${url}/user/${id}`);
  },
  getALlWithCategory: () => {
    return axiosInstance.get(`${url}/category`);
  },
  createTest: (data) => {
    return axiosInstance.post(`${url}`, data);
  },
  getOneByCode: (testCode) => {
    return axiosInstance.get(`${url}/${testCode}`);
  },
  updateTest: (testCode, data) => {
    return axiosInstance.put(`${url}/${testCode}`, data);
  },
  deleteTest: (testCode) => {
    return axiosInstance.delete(`${url}/${testCode}`);
  },
  updateQuestions: (testCode, questions) => {
    return axiosInstance.put(`${url}/${testCode}/questions`, questions);
  },
  createQuestion: (testCode, question) => {
    return axiosInstance.post(`${url}/${testCode}/questions`, question);
  },
  deleteQuestion: (testCode, questionIndex) => {
    return axiosInstance.delete(`${url}/${testCode}/${questionIndex}`);
  },
};
