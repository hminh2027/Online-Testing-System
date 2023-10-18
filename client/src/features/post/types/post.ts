import type { Resource, ResponseItem } from '../../../types/common';

export interface Post extends Resource {
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

export interface PostCreateDTO {
  name: string;
  description: string;
  imageUrl: string;
  isStudentApprovalLeave: boolean;
  password: string;
}

export type ResPostItem = ResponseItem<Post>;
export type ResPostList = ResponseItem<Post[]>;
export type ResPostModify = ResponseItem<Post>;
