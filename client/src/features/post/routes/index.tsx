import type { RouteObject } from 'react-router-dom';

import * as PostPage from '../pages';

export const postRoutes: RouteObject[] = [
  {
    index: true,
    element: <PostPage.PostList />,
  },
  {
    path: ':id',
    element: <PostPage.PostDetail />,
  },
];
