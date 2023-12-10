import { create } from 'zustand';

enum AnswerStatus {
  flagged,
  visited,
  unvisited,
}

export type AnswerStatusType = keyof typeof AnswerStatus;

interface AnswerSheetStore {
  questionMap: Map<number, AnswerStatusType> | null;
  setQuestionMap: (map: Map<number, AnswerStatusType>) => void;
  setQuestionStatus: (questionId: number, status: AnswerStatusType) => void;
}

export const useAnswerSheetStore = create<AnswerSheetStore>((set, get) => ({
  questionMap: null,
  setQuestionMap: (questionMap: Map<number, AnswerStatusType>) => set(() => ({ questionMap })),
  setQuestionStatus: (questionId: number, status: AnswerStatusType) =>
    set(() => {
      const { questionMap } = get();

      questionMap?.set(questionId, status);

      return { questionMap };
    }),
}));
