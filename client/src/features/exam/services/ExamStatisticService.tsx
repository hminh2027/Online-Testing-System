import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const ExamStatisticService: Service = {
  path: endpoints.apis.statistic.exam.path,
  getMany: {
    method: 'get',
  },
};
