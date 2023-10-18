import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { classRoutes } from '@/features/class/routes';
import { authRoutes } from '@/features/auth/routes';

export function AppRoutes() {
  const routes = createBrowserRouter([...authRoutes, ...classRoutes]);

  return <RouterProvider router={routes} />;
}
