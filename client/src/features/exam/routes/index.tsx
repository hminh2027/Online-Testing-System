import type { RouteObject } from 'react-router-dom';

import * as ExamPage from '../pages';
import { MainLayout } from '@/layouts/index';

export const examRoutes: RouteObject[] = [
  {
    path: 'exam',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ExamPage.ExamList />,
      },
    ],
  },
];
