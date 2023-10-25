import type { User } from '@/features/user';
import type { Resource, ResponseItem } from '../../../types/common';

export interface Post extends Resource {
  userId: number;
  classCode: string;
  content: string;
  imageUrl?: string;
  Comment: [];
  User: Pick<User, 'fullname' | 'imageUrl'>;
}

export interface PostCreateDTO extends Resource {
  classCode: string;
  content: string;
  imageUrl?: string;
}

export type ResPostItem = ResponseItem<Post>;
export type ResPostList = ResponseItem<Post[]>;
export type ResPostModify = ResponseItem<Post>;
