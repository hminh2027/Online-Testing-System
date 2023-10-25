import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { classRoutes } from '@/features/class/routes';
import { authRoutes } from '@/features/auth/routes';
import { AuthLayout } from '../features/auth/layouts/AuthLayout';

export function AppRoutes() {
  const routes = createBrowserRouter([
    {
      ErrorBoundary: () => <>404</>,
      hasErrorBoundary: true,
      element: <AuthLayout />,
      children: [
        ...authRoutes,
        ...classRoutes,
        {
          path: '*',
          element: <>404</>,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
