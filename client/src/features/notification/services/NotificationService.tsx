import { config } from '@/config/service';
import type { Service } from '@/types/service';

export const NotificationService: Service = {
  path: config.apis.notification.path,
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
