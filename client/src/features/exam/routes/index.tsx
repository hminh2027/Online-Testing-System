import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/index';
import * as ExamPage from '../pages';
import { ExamDetailLayout } from '@/layouts/ExamDetailLayout';

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
        element: <ExamDetailLayout />,
        children: [
          {
            index: true,
            element: <ExamPage.ExamDetail />,
          },
        ],
      },
    ],
  },
];
