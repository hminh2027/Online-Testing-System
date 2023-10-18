import type { RouteObject } from 'react-router-dom';

import * as AuthPage from '../pages';

export const authRoutes: RouteObject[] = [
  {
    path: 'signup',
    element: <AuthPage.SignUp />,
  },
  {
    path: 'login',
    element: <AuthPage.Login />,
  },
];
