import type { User } from '@/features/user';
import type { Resource, ResponseItem } from '../../../types/common';
import type { Question } from '.';

export interface Exam extends Resource {
  teacherId: number;
  title: string;
  description?: string;
  duration: number;
  numberOfQuestionDisplayed: number;
  User?: User;
  Question?: Question[];
}

export interface ExamCreateDTO extends Resource {
  title: string;
  description?: string;
  duration: number;
  numberOfQuestionDisplayed: number;
}

export type ResExamItem = ResponseItem<Exam>;
export type ResExamList = ResponseItem<Exam[]>;
export type ResExamModify = ResponseItem<Exam>;
