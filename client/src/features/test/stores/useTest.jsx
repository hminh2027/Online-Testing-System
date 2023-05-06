import { create } from "zustand";
import { testApi } from "../api/testApi";

const useTest = create((set) => ({
  test: null,
  currQuestionIndex: 0,
  userAnswers: null, //[[questionIndex - 1]: answerIndex]
  setTest: async (code) => {
    const { test } = await testApi.getOneByCode(code);
    set({
      test,
      userAnswers: new Array(test.questions.length)
        .fill(0)
        .map(() => ({ value: 0, doLater: false })),
    });
  },
  setCurrQuestionIndex: (questionIndex) => {
    set({ currQuestionIndex: questionIndex });
  },
  setUserAnswers: (questionIndex, value) => {
    set((state) => ({
      userAnswers: state.userAnswers.map((answer, index) => {
        if (index === questionIndex)
          return {
            ...answer,
            value,
          };
        else return answer;
      }),
    }));
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
