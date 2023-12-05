import type { User } from '@/features/user';
import type { Resource, ResponseItem } from '../../../types/common';

enum NotificationType {
  post,
  class,
  exam,
}

export type NotificationTypeKey = keyof typeof NotificationType;
export interface Notification extends Resource {
  content: string;
  url: string;
  userId: number;
  User: User;
  notiType: NotificationTypeKey;
}

export interface ResNotification extends Resource {
  isRead: boolean;
  userId: number;
  notiId: number;
  Notification: Notification;
}

export interface NotificationCreateDTO extends Resource {
  content: string;
  url?: string;
  recipents: number[];
  notiType: NotificationTypeKey;
  isRead?: boolean;
}

export type ResNotificationList = ResponseItem<ResNotification[]>;
export type ResNotificationModify = ResponseItem<ResNotification>;
