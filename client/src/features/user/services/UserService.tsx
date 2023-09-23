import { endpoints } from '@/config/service';
import type { Service } from '@/types/service';

const UserService: Service = {
  path: endpoints.apis.user.path,
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
    method: 'put',
  },
  patch: {
    method: 'patch',
  },
  delete: {
    method: 'delete',
  },
};

export default UserService;
