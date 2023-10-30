import type { User } from '@/features/user';
import type { Resource, ResponseItem } from '../../../types/common';

export interface ClassRoom extends Resource {
  code: string;
  teacherId: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  isStudentApprovalEnter: boolean;
  isStudentApprovalLeave: boolean;
  isStudentPostAllowed: boolean;
  password: string;
  User: User;
}

export interface ClassCreateDTO extends Resource {
  name: string;
  description: string;
  imageUrl: string | null;
  isStudentApprovalEnter: boolean;
  isStudentApprovalLeave: boolean;
  isStudentPostAllowed: boolean;
  password: string;
}

export type ResClassItem = ResponseItem<ClassRoom>;
export type ResClassList = ResponseItem<ClassRoom[]>;
export type ResClassModify = ResponseItem<ClassRoom>;
