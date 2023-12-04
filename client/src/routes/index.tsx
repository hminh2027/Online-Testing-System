import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './public';
import { privateRoutes } from './private';
import { NotFound } from '@/features/common';
import { storage } from '@/utils';
import { SocketClient } from '@/SocketClient';

export function AppRoutes() {
  const token = storage.get('Token');

  const routes = token ? privateRoutes : publicRoutes;

  const router = createBrowserRouter([
    {
      ErrorBoundary: NotFound,
      hasErrorBoundary: true,
      element: <SocketClient />,
      children: [
        ...routes,
        {
          index: true,
          element: <Navigate to="/class" replace />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
