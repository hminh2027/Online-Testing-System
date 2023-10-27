import type { User } from '@/features/user';
import type { Resource, ResponseItem } from '../../../types/common';
import type { ClassRoom } from '@/features/class/types';

export interface UserClass extends Resource {
  classCode: string;
  studentId: number;
  isPending: boolean;
  User: User;
  Class: ClassRoom;
}

export interface UserClassCreateDTO extends Resource {
  classCode: string;
  studentId: number;
  password?: string;
}

export type ResUserClassItem = ResponseItem<UserClass>;
export type ResUserClassList = ResponseItem<UserClass[]>;
export type ResUserClassModify = ResponseItem<UserClass>;
