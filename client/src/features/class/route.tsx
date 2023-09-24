import { ClassDetailLayout } from '@/layouts/ClassDetailLayout';
import ClassesPage from './pages/ClassList';

export const ClassRoute = [
  {
    path: '',
    element: <ClassesPage />,
  },
  {
    path: ':id',
    element: <ClassDetailLayout />,
    children: [
      {
        path: '',
        element: <>detail</>,
      },
    ],
  },
];
