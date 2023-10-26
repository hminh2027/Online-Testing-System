import type { RouteObject } from 'react-router-dom';

import * as UserClassPage from '../pages';

export const userClassRoutes: RouteObject[] = [
  {
    index: true,
    element: <UserClassPage.UserClassList />,
  },
];
