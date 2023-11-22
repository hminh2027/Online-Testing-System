import type { RouteObject } from 'react-router-dom';
import { classRoutes } from '@/features/class/routes';
import { examRoutes } from '@/features/exam/routes';
import { scheduleRoutes } from '@/features/schedule/routes';

export const privateRoutes: RouteObject[] = [...classRoutes, ...examRoutes, ...scheduleRoutes];
