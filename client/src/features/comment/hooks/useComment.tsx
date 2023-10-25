import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import { CommentService } from '../services/CommentService';
import type { CommentCreateDTO, ResCommentItem, ResCommentList, ResCommentModify } from '../types';

export const {
  useList: useListComment,
  useAddItem: useAddComment,
  useUpdateItem: useUpdateComment,
  useDeleteItem: useDeleteComment,
} = initialCustomQuery<CommentCreateDTO, ResCommentList, ResCommentItem, ResCommentModify>(
  CommentService,
);
