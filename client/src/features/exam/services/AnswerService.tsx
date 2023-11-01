import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const AnswerService: Service = {
  path: endpoints.apis.answer.path,
  delete: {
    method: 'delete',
  },
};
