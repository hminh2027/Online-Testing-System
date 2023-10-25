import type { Resource, ResponseItem } from '../../../types/common';

export interface User extends Resource {
  email: number;
  fullname: string;
  imageUrl: string;
  password: string;
  isTeacher: boolean;
  phone?: string;
  birth?: string;
  studentId?: string;
  school?: string;
}
export type ResUserList = ResponseItem<User[]>;
export type ResUserItem = ResponseItem<User>;
export type ResUserModify = ResponseItem<User>;
