import { UserService } from '@/features/user/services';
import { initialCustomQuery } from '@/hooks/useCustomQuery/useCustomQuery';

import type {
  ResUserItem,
  ResUserList,
  ResUserModify,
  User,
  UserCreateDTO,
} from '@/features/user/types';
import type { Either } from '@/types';

export const {
  useList: useListUser,
  useAddItem: useAddUser,
  usePatchItem: usePatchUser,
} = initialCustomQuery<Either<User, UserCreateDTO>, ResUserList, ResUserItem, ResUserModify>(
  UserService,
);
