import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const ClassService: Service = {
  path: endpoints.apis.class.path,
  getOne: {
    method: 'get',
  },
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
