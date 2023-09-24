import { Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { ConfigProvider, Spin } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import 'antd/dist/reset.css';
import '@/App.css';
import { themeConfig } from '@/config';
import { ClassRoute } from '@/features/class';
import { AppRoutes } from '@/constants/path';
import { ErrorPage } from './features/error';
import { MainLayout } from './layouts';
import * as AuthPages from '@/features/auth/pages';

const router = createBrowserRouter([
  {
    ErrorBoundary: ErrorPage,
    hasErrorBoundary: true,
    children: [
      {
        path: 'login',
        element: <AuthPages.Login />,
      },
      {
        path: 'signup',
        element: <AuthPages.SignUp />,
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
    ],
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
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Suspense fallback={<Spin />}>
        <ConfigProvider theme={themeConfig}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ConfigProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
