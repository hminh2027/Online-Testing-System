import type { RouteObject } from 'react-router-dom';

import * as ClassPage from '../pages';
import { postRoutes } from '@/features/post/routes';

export const classRoutes: RouteObject[] = [
  {
    path: 'class',
    children: [
      {
        path: '',
        element: <ClassPage.ClassList />,
      },
      {
        path: ':id',
        children: postRoutes,
      },
    ],
  },
];
