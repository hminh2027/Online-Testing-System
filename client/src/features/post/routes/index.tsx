import type { RouteObject } from 'react-router-dom';

import * as PostPage from '../pages';

export const postRoutes: RouteObject[] = [
  {
    path: 'newsfeed',
    children: [
      {
        path: '',
        element: <PostPage.PostList />,
      },
      {
        path: ':id',
        element: <PostPage.PostDetail />,
      },
    ],
  },
];
