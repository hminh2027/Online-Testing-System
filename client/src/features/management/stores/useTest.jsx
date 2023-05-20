import { create } from "zustand";
import { managementApi } from "../api/managementApi";

const useTest = create((set) => ({
  test: null,
  questions: null,
  fetchTest: async (code) => {
    const { test } = await managementApi.getOneByCode(code);
    test.questions
      .sort((a, b) => a.index - b.index)
      .forEach((q) => ({
        ...q,
        answers: q.answers.sort((x, y) => x.index - y.index),
      }));
    set({ test, questions: test.questions });
  },
  setTest: (test) => {
    set({ test });
  },
  setQuestions: (questions) => {
    if (Array.isArray(questions))
      questions
        .sort((a, b) => a.index - b.index)
        .forEach((q) => ({
          ...q,
          answers: q.answers.sort((x, y) => x.index - y.index),
        }));
    set({ questions: questions });
  },
  deleteTest: () => {},
}));
export { useTest };
