import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const ChoiceService: Service = {
  path: endpoints.apis.choice.path,
  create: {
    method: 'post',
  },
};
