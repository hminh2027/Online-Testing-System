import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import type { ResPostList, ResPostItem, ResPostModify, PostCreateDTO } from '@/features/post/types';
import { PostService } from '../services/PostService';

export const {
  useItem: usePost,
  useList: useListPost,
  useAddItem: useAddPost,
  useUpdateItem: useUpdatePost,
  usePatchItem: usePatchPost,
  useDeleteItem: useDeletePost,
} = initialCustomQuery<PostCreateDTO, ResPostList, ResPostItem, ResPostModify>(PostService);
