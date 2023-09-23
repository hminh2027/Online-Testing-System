import { NotificationService } from '@/features/notification/services';
import { initialCustomQuery } from '../../../hooks/useCustomQuery/useCustomQuery';
import type {
  Notification,
  ResNotificationList,
  ResNotificationModify,
} from '@/features/notification/types';

export const {
  useList: useListNotification,
  useAddItem: useAddNotification,
  usePatchItem: usePatchNotification,
  useDeleteItem: useDeleteNotification,
} = initialCustomQuery<
  Notification,
  ResNotificationList,
  null,
  ResNotificationModify
>(NotificationService);
