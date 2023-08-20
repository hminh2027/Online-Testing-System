import { config } from '../../config';

export const UserService = {
  path: config.apis.user.path,
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
