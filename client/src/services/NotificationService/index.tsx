import { config } from '@/config';
import type { Service } from '@/types/service';

const NotificationService: Service = {
  path: config.apis.nofitication.path,
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
