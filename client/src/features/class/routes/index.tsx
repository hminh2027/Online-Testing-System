import type { RouteObject } from 'react-router-dom';

import * as ClassPage from '../pages';
import { postRoutes } from '@/features/post/routes';
import { MainLayout } from '@/layouts/index';
import { userClassRoutes } from '@/features/userClass/routes';
import { ClassDetailLayout } from '@/layouts/ClassDetailLayout/ClassDetailLayout';
import { UserClassLayout } from '@/layouts/UserClassLayout';

export const classRoutes: RouteObject[] = [
  {
    path: 'class',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <ClassPage.ClassList />,
      },
      {
        path: ':code',
        element: <ClassDetailLayout />,
        children: [
          {
            index: true,
            element: <ClassPage.ClassDetail />,
          },
          {
            path: 'newsfeed',
            children: postRoutes,
          },
          {
            path: 'students',
            element: <UserClassLayout />,
            children: userClassRoutes,
          },
          {
            path: 'exams',
            children: [],
          },
          {
            path: 'schedule',
            children: [],
          },
        ],
      },
    ],
  },
];
