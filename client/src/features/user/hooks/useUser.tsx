import { UserService } from '@/features/user/services';
import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';

import type {
  ResUserItem,
  ResUserList,
  ResUserModify,
  User,
} from '@/features/user/types';

export const {
  useList: useListUser,
  useAddItem: useAddUser,
  useUpdateItem: useUpdateUser,
} = initialCustomQuery<User, ResUserList, ResUserItem, ResUserModify>(
  UserService,
);
