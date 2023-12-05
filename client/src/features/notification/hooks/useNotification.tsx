import { NotificationService } from '@/features/notification/services';
import type {
  NotificationCreateDTO,
  ResNotificationList,
  ResNotificationModify,
} from '@/features/notification/types';
import { initialCustomQuery } from '@/hooks/useCustomQuery';

export const {
  useList: useListNotification,
  useAddItem: useAddNotification,
  usePatchItem: usePatchNotification,
  useDeleteItem: useDeleteNotification,
} = initialCustomQuery<NotificationCreateDTO, ResNotificationList, null, ResNotificationModify>(
  NotificationService,
);
