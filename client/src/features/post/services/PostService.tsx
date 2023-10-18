import { endpoints } from '@/config';
import type { Service } from '@/types/service';

export const PostService: Service = {
  path: endpoints.apis.post.path,
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
