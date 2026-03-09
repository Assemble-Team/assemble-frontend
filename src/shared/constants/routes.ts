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
  MYPAGE: {
    HOME: '/mypage',
    GROUPS: {
      LIKED: '/mypage/groups/liked',
      JOINED: '/mypage/groups/joined',
      PENDING: '/mypage/groups/pending',
    },
    ACTIVITIES: {
      POSTS: '/mypage/activities/posts',
      COMMENTS: '/mypage/activities/comments',
    },
    SETTINGS: {
      PROFILE: '/mypage/settings/profile',
      NOTIFICATIONS: '/mypage/settings/notifications',
    },
  },
} as const;
