import { ClassDetailLayout } from '@/layouts/ClassDetailLayout';
import ClassesPage from '../pages/ClassList';
import { Layout } from '../layouts/Layout';

export const ClassRoute = [
  {
    path: '',
    element: (
      <Layout title="Lớp học">
        <ClassesPage />
      </Layout>
    ),
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
