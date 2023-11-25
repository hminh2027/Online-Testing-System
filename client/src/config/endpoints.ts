export const endpoints = {
  baseUrl: import.meta.env.VITE_API_URL as string,
  apis: {
    default: '/',
    user: {
      path: '/user',
    },
    notification: {
      path: '/notification',
    },
    class: {
      path: '/class',
    },
    userClass: {
      path: '/user_class',
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
    exam: {
      path: '/exam',
    },
    question: {
      path: '/question',
    },
    answer: {
      path: '/answer',
    },
    attempt: {
      path: '/attempt',
    },
    choice: {
      path: '/choice',
    },
    statistic: {
      exam: {
        path: '/statistic/exam',
      },
    },
  },
};
