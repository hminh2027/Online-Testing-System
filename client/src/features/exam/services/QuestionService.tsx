import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const QuestionService: Service = {
  path: endpoints.apis.question.path,
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
