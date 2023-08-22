import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClassDetailLayout from './layouts/ClassDetailLayout';
import MainLayout from './layouts/MainLayout';
import 'antd/dist/reset.css';
import './App.css';
import themeConfig from './config/theme';

const router = createBrowserRouter([
  {
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <MainLayout />
      </QueryParamProvider>
    ),
    children: [
      {
        path: 'login',
        element: <div>this is login</div>,
      },
      {
        path: 'signup',
        element: <div>this is signup</div>,
      },
      {
        path: 'class',
        element: <ClassDetailLayout />,
        children: [
          {
            path: 'hello',
            element: <>this is detail</>,
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
