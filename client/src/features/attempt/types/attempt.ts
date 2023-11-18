import type { Exam } from '@/features/exam/types';
import type { Resource, ResponseItem } from '../../../types/common';
import type { Choice } from './choice';

export interface Attempt extends Resource {
  studentId: number;
  examId: number;
  startedAt: Date;
  endedAt: Date;
  point?: number;
  numberOfMouseLeave?: number;
  Exam: Exam;
  Choice: Choice[];
}

export interface AttemptCreateDTO extends Resource {
  examId: number;
}

export type ResAttemptItem = ResponseItem<Attempt>;
export type ResAttemptList = ResponseItem<Attempt[]>;
export type ResAttemptModify = ResponseItem<Attempt>;
