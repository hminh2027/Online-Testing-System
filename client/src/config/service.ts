export const endpoints = {
  baseUrl: import.meta.env.VITE_API_URL as string,
  apis: {
    default: '/',
    user: {
      path: '/user',
      detail: (id: string) => `/user/${id}`, // TODO: this way will make the typing more loosely
    },
    notification: {
      path: '/notification',
    },
    class: {
      path: '/class',
    },
    auth: {
      path: '/auth',
    },
    post: {
      path: '/post',
    },
  },
};
