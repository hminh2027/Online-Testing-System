import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const AttemptService: Service = {
  path: endpoints.apis.attempt.path,
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
