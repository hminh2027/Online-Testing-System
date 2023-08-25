import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { QueryParamProvider } from 'use-query-params';
// import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClassDetailLayout from './layouts/ClassDetailLayout';
import MainLayout from './layouts/MainLayout';
import 'antd/dist/reset.css';
import './App.css';
import ClassesPage from './features/class/pages/ClassList';
import { themeConfig } from './config';
import { Login } from './features/auth';

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
        children: [
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
        ],
      },
    ],
  },

  {
    index: true,
    element: <div>defaulT</div>,
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
