import type { Resource, ResponseItem } from '../../../types/common';

export interface Notification extends Resource {
  userId: number;
  isRead: boolean;
  content: string;
  url: string;
  createdAt: Date;
}

export type ResNotificationList = ResponseItem<Notification[]>;
export type ResNotificationModify = ResponseItem<Notification>;
