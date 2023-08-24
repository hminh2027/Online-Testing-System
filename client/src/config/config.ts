export const config = {
  baseUrl: import.meta.env.VITE_API_URL as string,
  apis: {
    default: '/',
    user: {
      path: '/user',
    },
    notification: {
      path: '/notification',
    },
  },
};
