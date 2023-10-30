import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/index';
import * as ExamPage from '../pages';

export const examRoutes: RouteObject[] = [
  {
    path: 'exam',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ExamPage.ExamList />,
      },
      {
        path: ':id',
        element: <ExamPage.ExamDetail />,
      },
    ],
  },
];
