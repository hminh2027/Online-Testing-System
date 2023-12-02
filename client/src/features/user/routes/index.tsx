import type { RouteObject } from 'react-router-dom';

import * as UserPage from '../pages';
import { MainLayout } from '@/layouts/';

export const userRoutes: RouteObject[] = [
  {
    path: 'profile',
    element: <MainLayout />,
    children: [
      {
        path: 'me',
        element: <UserPage.UserProfile />,
      },
      {
        path: ':id',
        element: <UserPage.UserProfile />,
      },
    ],
  },
];
