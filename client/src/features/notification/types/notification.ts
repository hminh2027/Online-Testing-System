import type { Resource, ResponseItem } from '../../../types/common';

export interface Notification extends Resource {
  userId: number;
  isRead: boolean;
  content: string;
  url: string;
}

export interface CommentNotificationDTO extends Resource {
  content: string;
  url: string;
  recipents: number[];
}

export type ResNotificationList = ResponseItem<Notification[]>;
export type ResNotificationModify = ResponseItem<Notification>;
