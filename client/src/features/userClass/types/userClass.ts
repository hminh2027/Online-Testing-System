import type { Resource, ResponseItem } from '../../../types/common';

export interface UserClass extends Resource {
  classCode: string;
  studentId: number;
}

export interface UserClassCreateDTO extends Resource {
  classCode: string;
  studentId: number;
  password?: string;
}

export type ResUserClassItem = ResponseItem<UserClass>;
export type ResUserClassList = ResponseItem<UserClass[]>;
export type ResUserClassModify = ResponseItem<UserClass>;
