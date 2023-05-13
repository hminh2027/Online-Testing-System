import { create } from "zustand";
import { testApi } from "../api/testApi";
import { attemptApi } from "../api/attemptApi";

const useTest = create((set, get) => ({
  test: null,
  attempt: null,
  currQuestionIndex: 1,
  userAnswers: null,
  setAttempt: async (testCode) => {
    let { attempt } = await attemptApi.getOneByCode(testCode);
    if (!attempt) {
      const rs = await attemptApi.create({ testCode });
      attempt = rs.attempt;
    }

    set({ attempt });
  },
  setTest: async (testCode) => {
    const { test } = await testApi.getOneByCode(testCode);
    set({ test });
  },
  resumeTest: async (test, attempt) => {
    const answers = new Map();
    for (let i = 0; i < test.questions.length; i++) {
      answers.set(test.questions[i].index, {
        answerIndex: 0,
        doLater: false,
      });
    }

    for (let i = 0; i < attempt.choices.length; i++) {
      answers.set(attempt.choices[i].questionIndex, {
        answerIndex: attempt.choices[i].answerIndex,
        doLater: false,
      });
    }
    set({ userAnswers: answers });
  },
  setCurrQuestionIndex: (questionIndex) => {
    set({ currQuestionIndex: questionIndex });
  },
  setUserAnswers: async (questionIndex, answerIndex) => {
    set((state) => ({
      userAnswers: state.userAnswers.set(questionIndex, {
        ...state.userAnswers.get(questionIndex),
        answerIndex,
      }),
    }));
  },
  setDoLater: (questionIndex) => {
    const userAnswers = get().userAnswers;
    const answer = userAnswers.get(questionIndex);

    set((state) => ({
      userAnswers: state.userAnswers.set(questionIndex, {
        ...answer,
        doLater: !answer.doLater,
      }),
    }));
  },
}));
export { useTest };
