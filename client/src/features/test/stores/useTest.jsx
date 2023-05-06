import { create } from "zustand";
import { testApi } from "../api/testApi";

const useTest = create((set) => ({
  test: null,
  currQuestionIndex: -1,
  userAnswers: null, //[[questionIndex - 1]: answerIndex]
  setTest: async (testId) => {
    const { data } = await testApi.getOneById(testId);
    set({
      test: data.test,
      userAnswers: new Array(data.test.questions.length)
        .fill(0)
        .map(() => ({ value: 0, doLater: false })),
    });
  },
  setCurrQuestionIndex: (questionIndex) => {
    set({ currQuestionIndex: questionIndex });
  },
  setUserAnswers: (questionIndex, answerIndex) => {
    set((state) => {
      // state.userAnswers[questionIndex] = { value: answerIndex, doLater: false };
      return {
        userAnswers: state.userAnswers.map((answer, index) => {
          if (index === questionIndex)
            return {
              ...answer,
              value: answerIndex,
            };
          else return answer;
        }),
      };
    });
  },
  setDoLater: (questionIndex) => {
    set((state) => {
      return {
        userAnswers: state.userAnswers.map((answer, index) => {
          if (index === questionIndex)
            return {
              ...answer,
              doLater: !answer.doLater,
            };
          else return answer;
        }),
      };
    });
  },
}));
export { useTest };
