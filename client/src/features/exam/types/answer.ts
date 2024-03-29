import type { Resource, ResponseItem } from '../../../types/common';

export interface Answer extends Resource {
  questionId: number;
  content: string;
  isCorrect: number;
}

export interface AnswerCreateDTO extends Resource {
  content: string;
  isCorrect: number;
}

export type ResAnswerItem = ResponseItem<Answer>;
export type ResAnswerList = ResponseItem<Answer[]>;
export type ResAnswerModify = ResponseItem<Answer>;
