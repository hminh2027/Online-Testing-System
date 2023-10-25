import type { RouteObject } from 'react-router-dom';

import * as ClassPage from '../pages';
import { postRoutes } from '@/features/post/routes';
import { ClassDetailLayout } from '../layouts';
import { MainLayout } from '@/layouts/index';

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
            children: [],
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
