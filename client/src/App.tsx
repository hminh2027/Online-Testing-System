import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import ClassDetailLayout from './layouts/ClassDetailLayout';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter([
  {
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <MainLayout menuItems={{}} />
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

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
