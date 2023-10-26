import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';
import { UserClassService } from '../services/UserClassService';
import type {
  ResUserClassItem,
  ResUserClassList,
  ResUserClassModify,
  UserClassCreateDTO,
} from '../types/userClass';

export const {
  useList: useListUserClass,
  useAddItem: useAddUserClass,
  usePatchItem: usePatchUserClass,
  useDeleteItem: useDeleteUserClass,
} = initialCustomQuery<UserClassCreateDTO, ResUserClassList, ResUserClassItem, ResUserClassModify>(
  UserClassService,
);
