import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/index';
import * as SchedulePage from '../pages';

export const scheduleRoutes: RouteObject[] = [
  {
    path: 'schedule',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <SchedulePage.Schedule />,
      },
    ],
  },
];
