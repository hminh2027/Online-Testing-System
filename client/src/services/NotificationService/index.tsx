import { config } from '@/config/config';
import type { Service } from '@/types/service';

const NotificationService: Service = {
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

export default NotificationService;
