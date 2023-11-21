import { NotificationService } from '@/features/notification/services';
import type {
  CommentNotificationDTO,
  ResNotificationList,
  ResNotificationModify,
} from '@/features/notification/types';
import { initialCustomQuery } from '@/hooks/useCustomQuery';

export const {
  useList: useListNotification,
  useAddItem: useAddNotification,
  usePatchItem: usePatchNotification,
  useDeleteItem: useDeleteNotification,
} = initialCustomQuery<CommentNotificationDTO, ResNotificationList, null, ResNotificationModify>(
  NotificationService,
);
