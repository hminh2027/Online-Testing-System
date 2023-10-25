import type { User } from '@/features/user';
import type { Resource, ResponseItem } from '../../../types/common';

export interface Comment extends Resource {
  userId: number;
  content: string;
  User: Pick<User, 'fullname' | 'imageUrl'>;
}

export interface CommentCreateDTO extends Resource {
  content: string;
  postId: number;
}

export type ResCommentItem = ResponseItem<Comment>;
export type ResCommentList = ResponseItem<Comment[]>;
export type ResCommentModify = ResponseItem<Comment>;
