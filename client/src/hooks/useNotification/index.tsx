import NotificationService from '@/services/NotificationService';
import { initialCustomQuery } from '../useCustomQuery';
import type {
  Notification,
  NotificationQuery,
  ResNotificationList,
  ResNotificationModify,
} from '@/models/notification';

export const {
  useList: useListNotification,
  useAddItem: useAddNotification,
  usePatchItem: usePatchNotification,
  useDeleteItem: useDeleteNotification,
} = initialCustomQuery<
  Notification,
  ResNotificationList,
  null,
  ResNotificationModify,
  NotificationQuery
>(NotificationService);
