import { create } from "zustand";
import { managementApi } from "../api/managementApi";

const useTest = create((set) => ({
  test: null,
  questions: null,
  setTest: async (code) => {
    const { test } = await managementApi.getOneByCode(code);
    set({ test, questions: test.questions });
  },
  setQuestions: (questions) => {
    questions
      .sort((a, b) => a.index - b.index)
      .forEach((q) => ({
        ...q,
        answers: q.answers.sort((x, y) => x.index - y.index)
      }));
    set({ questions: questions });
  },
}));
export { useTest };
