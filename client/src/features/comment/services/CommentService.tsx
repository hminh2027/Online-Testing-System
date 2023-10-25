import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const CommentService: Service = {
  path: endpoints.apis.comment.path,
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
