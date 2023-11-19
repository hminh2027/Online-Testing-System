import type { Answer, Question } from '@/features/exam/types';
import type { Resource, ResponseItem } from '@/types';

export interface Choice extends Resource {
  answerId: number;
  attemptId: number;
  questionId: number;
  Answer: Answer;
  Question: Question;
}

export interface ChoiceCreateDTO extends Resource {
  answerId: number;
  attemptId: number;
  questionId: number;
}

export type ResChoiceItem = ResponseItem<Choice>;
export type ResChoiceList = ResponseItem<Choice[]>;
