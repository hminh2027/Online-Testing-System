import type { Resource, ResponseItem } from '@/types';

export interface Choice extends Resource {
  answerId: number;
  attemptId: number;
  questionId: number;
}

export interface ChoiceCreateDTO extends Resource {
  answerId: number;
  attemptId: number;
  questionId: number;
}

export type ResChoiceItem = ResponseItem<Choice>;
export type ResChoiceList = ResponseItem<Choice[]>;
