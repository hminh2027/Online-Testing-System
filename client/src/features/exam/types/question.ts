import type { Answer, AnswerCreateDTO } from '.';
import type { Resource, ResponseItem } from '../../../types/common';

export interface Question extends Resource {
  examId: number;
  index: number;
  imageUrl?: string;
  content: string;
  point: number;
  explanation?: string;
  isPointPerCorrection: boolean;
  Answer: Answer[];
}

export interface QuestionCreateDTO extends Resource {
  examId: number;
  index?: number;
  imageUrl?: string;
  content: string;
  point: number;
  explanation?: string;
  isPointPerCorrection?: boolean;
  answers: AnswerCreateDTO[];
}

export interface TableFormatData {
  question: string;
  explanation?: string;
  point: number;
  answer: string;
  isCorrect: number;
  rowSpan: number;
  key: string;
}

export type ApiFormatData = Omit<QuestionCreateDTO, 'examId'>;

export type ResQuestionItem = ResponseItem<Question>;
export type ResQuestionList = ResponseItem<Question[]>;
export type ResQuestionModify = ResponseItem<Question>;
