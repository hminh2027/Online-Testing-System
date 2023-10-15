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
  password: string;
}

export interface ClassCreateDTO {
  name: string;
  description: string;
  imageUrl: string;
  isStudentApprovalLeave: boolean;
  password: string;
}

export type ResClassItem = ResponseItem<ClassRoom>;
export type ResClassList = ResponseItem<ClassRoom[]>;
export type ResClassModify = ResponseItem<ClassRoom>;
