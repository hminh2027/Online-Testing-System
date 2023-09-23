import { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/layouts/MainLayout';
import 'antd/dist/reset.css';
import '@/App.css';
import { themeConfig } from '@/config';
import { Login } from '@/features/auth';
import { ClassRoute } from '@/features/class';
import { AppRoutes } from '@/constants/path';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <div>this is signup</div>,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: 'class',
        children: ClassRoute,
      },
    ],
  },
  {
    index: true,
    element: <Navigate to={AppRoutes.Login} replace />,
  },
  {
    path: '*',
    element: <div>404 | Page not found</div>,
  },
]);

const queryClient = new QueryClient();

ConfigProvider.config({
  theme: {
    token: {
      ...themeConfig.token,
    },
    components: {
      ...themeConfig.components,
    },
  },
});

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
