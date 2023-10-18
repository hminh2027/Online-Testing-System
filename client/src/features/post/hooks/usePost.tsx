import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import type { Post, ResPostList, ResPostItem, ResPostModify } from '@/features/post/types';
import { PostService } from '../services/PostService';

export const {
  useItem: usePost,
  useList: useListPost,
  useAddItem: useAddPost,
  useUpdateItem: useUpdatePost,
  usePatchItem: usePatchPost,
  useDeleteItem: useDeletePost,
} = initialCustomQuery<Post, ResPostList, ResPostItem, ResPostModify>(PostService);
