import { axiosInstance } from "../../../lib";

const url = "choice";

export const choiceApi = {
  create: async ({ attemptId, questionIndex, answerIndex }) => {
    try {
      return await axiosInstance.post(`${url}/`, {
        attemptId,
        questionIndex,
        answerIndex,
      });
    } catch (error) {
      throw error;
    }
  },
};
