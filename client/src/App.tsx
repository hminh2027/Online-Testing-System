import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const router = createBrowserRouter([
  {
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>div</QueryParamProvider>
    ),
    path: '/',
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
