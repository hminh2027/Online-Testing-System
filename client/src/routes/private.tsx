import type { RouteObject } from 'react-router-dom';
import { classRoutes } from '@/features/class/routes';
import { examRoutes } from '@/features/exam/routes';
import { scheduleRoutes } from '@/features/schedule/routes';
import { userRoutes } from '@/features/user/routes';
import { requestRoutes } from '@/features/userClass/routes';

export const privateRoutes: RouteObject[] = [
  ...classRoutes,
  ...examRoutes,
  ...scheduleRoutes,
  ...userRoutes,
  ...requestRoutes,
];
