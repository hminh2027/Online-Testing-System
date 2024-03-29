import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const NotificationService: Service = {
  path: endpoints.apis.notification.path,
  getMany: {
    method: 'get',
  },
  create: {
    method: 'post',
  },
  patch: {
    method: 'patch',
  },
  delete: {
    method: 'delete',
  },
};
