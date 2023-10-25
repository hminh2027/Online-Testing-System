import type { Resource, ResponseItem } from '../../../types/common';

export interface ClassRoom extends Resource {
  code: string;
  teacherId: number;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  isStudentApprovalLeave: boolean;
  isStudentPostAllowed: boolean;
  password: string;
}

export interface ClassCreateDTO extends Resource {
  name: string;
  description: string;
  imageUrl: string | null;
  isStudentApprovalLeave: boolean;
  isStudentPostAllowed: boolean;
  password: string;
}

export type ResClassItem = ResponseItem<ClassRoom>;
export type ResClassList = ResponseItem<ClassRoom[]>;
export type ResClassModify = ResponseItem<ClassRoom>;
