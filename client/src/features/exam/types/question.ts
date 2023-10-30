import type { Answer } from '.';
import type { Resource, ResponseItem } from '../../../types/common';

export interface Question extends Resource {
  examId: number;
  index: number;
  imageUrl?: string;
  content: string;
  score: number;
  explaination?: string;
  isPointPerCorrection: boolean;
  Answer: Answer[];
}

export interface QuestionCreateDTO extends Resource {
  examId: number;
  index: number;
  imageUrl?: string;
  content: string;
  score: number;
  explaination?: string;
  isPointPerCorrection: boolean;
}

export type ResQuestionItem = ResponseItem<Question>;
export type ResQuestionList = ResponseItem<Question[]>;
export type ResQuestionModify = ResponseItem<Question>;
