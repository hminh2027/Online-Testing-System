import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const ExamService: Service = {
  path: endpoints.apis.exam.path,
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
