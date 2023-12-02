import type { RouteObject } from 'react-router-dom';

import * as UserClassPage from '../pages';
import { MainLayout } from '@/layouts/';

export const userClassRoutes: RouteObject[] = [
  {
    index: true,
    element: <UserClassPage.UserClassList />,
  },
];

export const requestRoutes: RouteObject[] = [
  {
    path: 'request',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <UserClassPage.ClassRequest />,
      },
    ],
  },
];
