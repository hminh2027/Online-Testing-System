import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import { ClassService } from '../services/ClassService';
import type { ClassCreateDTO, ResClassItem, ResClassList, ResClassModify } from '../types';

export const {
  useItem: useClass,
  useList: useListClass,
  useAddItem: useAddClass,
  useUpdateItem: useUpdateClass,
  usePatchItem: usePatchClass,
  useDeleteItem: useDeleteClass,
} = initialCustomQuery<ClassCreateDTO, ResClassList, ResClassItem, ResClassModify>(ClassService);
