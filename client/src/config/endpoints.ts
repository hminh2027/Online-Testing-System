export const endpoints = {
  baseUrl: import.meta.env.VITE_API_URL as string,
  apis: {
    default: '/',
    user: {
      path: '/user',
    },
    // notification: {
    //   path: '/notification',
    // },
    class: {
      path: '/class',
    },
    auth: {
      path: '/auth',
    },
    post: {
      path: '/post',
    },
    comment: {
      path: '/comment',
    },
  },
};
