import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import { UserClassService } from '../services/UserClassService';
import type { ResUserClassList, ResUserClassModify, UserClassCreateDTO } from '../types/userClass';

export const {
  useList: useListUserClass,
  useAddItem: useAddUserClass,
  useAddItems: useAddUserClasses,
  usePatchItem: usePatchUserClass,
  useDeleteItem: useDeleteUserClass,
} = initialCustomQuery<UserClassCreateDTO, ResUserClassList, null, ResUserClassModify>(
  UserClassService,
);
