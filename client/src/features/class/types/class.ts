import type { Resource, ResponseItem } from '../../../types/common';

export interface ClassRoom extends Resource {
  teacherId: number;
  name: string;
  description: string;

  createdAt: Date;
}

export type ResClassItem = ResponseItem<ClassRoom>;
export type ResClassList = ResponseItem<ClassRoom[]>;
export type ResClassModify = ResponseItem<ClassRoom>;
