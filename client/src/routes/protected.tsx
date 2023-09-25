import { Navigate } from 'react-router-dom';
import ClassRoutes from '@/features/class/routes';

export const protectedRoutes = [
  {
    path: '/class/*',
    element: <ClassRoutes />,
  },
  {
    index: true,
    element: <Navigate to="/login" replace />,
  },
];
