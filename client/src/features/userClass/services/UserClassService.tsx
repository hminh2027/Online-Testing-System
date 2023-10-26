import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const UserClassService: Service = {
  path: endpoints.apis.userClass.path,
  getMany: {
    method: 'get',
  },
  create: {
    method: 'post',
  },
  update: {
    method: 'update',
  },
  delete: {
    method: 'delete',
  },
};
