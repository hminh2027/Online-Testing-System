import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import { ClassService } from '../services/ClassService';
import type { ClassRoom, ResClassItem, ResClassList, ResClassModify } from '../types';

export const {
  useItem: useClass,
  useList: useListClass,
  useAddItem: useAddClass,
  useUpdateItem: useUpdateClass,
  usePatchItem: usePatchClass,
  useDeleteItem: useDeleteClass,
} = initialCustomQuery<ClassRoom, ResClassList, ResClassItem, ResClassModify>(ClassService);
