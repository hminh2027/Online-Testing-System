import type { User } from '@/features/user';
import type { Resource, ResponseItem } from '../../../types/common';
import type { Question } from '.';
import type { ClassRoom } from '@/features/class/types';
import type { Attempt } from '@/features/attempt/types';

export interface Exam extends Resource {
  teacherId: number;
  title: string;
  description?: string;
  duration: number;
  numberOfQuestions: number;
  totalPoint: number;
  startAt: Date;
  deadlineAt: Date;
  attemptLimit: number;
  isProcting: boolean;
  isSubmitLateAllowed: boolean;
  isShuffleQuestion: boolean;
  isShowAnswer: boolean;
  isShowExplaination: boolean;
  isResumeAllowed: boolean;
  classCode: string;
  User?: User;
  Attempt?: Attempt[];
  Question?: Question[];
  Class: ClassRoom;
}

export interface ExamCreateDTO extends Resource {
  title: string;
  description?: string;
  duration: number;
  startAt: Date;
  deadlineAt?: Date | null;
  attemptLimit: number;
  isProcting: boolean;
  isSubmitLateAllowed: boolean;
  isShuffleQuestion: boolean;
  isShowAnswer: boolean;
  isShowExplaination: boolean;
  isResumeAllowed: boolean;
  classCode: string;
}

export type ResExamItem = ResponseItem<Exam>;
export type ResExamList = ResponseItem<Exam[]>;
export type ResExamModify = ResponseItem<Exam>;
