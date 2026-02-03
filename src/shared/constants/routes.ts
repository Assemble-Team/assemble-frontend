export const ROUTES = {
  HOME: '/',
  GROUPS: {
    LIST: '/groups',
    POPULAR: '/groups/popular',
    MY: '/groups/my',
    CREATE: '/groups/create',
    DETAIL: (id: string) => `/groups/${id}`,
  },
  AUTH: {
    LOGIN: '/login',
    FIND_PASSWORD: '/find-password',
    SIGNUP: '/signup',
  },
} as const;
