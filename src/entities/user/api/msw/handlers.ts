import { http, HttpResponse } from 'msw';
import { NotificationSettings, User } from '../../model/types';

let mockProfile: User = {
  id: 1,
  email: 'test@example.com',
  name: '강동욱',
  avatarUrl:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
  bio: '안녕하세요! 새로운 사람들과 운동하고 소통하는 것을 좋아하는 프론트엔드 개발자입니다.',
};

let mockNotificationSettings: NotificationSettings = {
  scheduleApp: true,
  boardApp: true,
  noticeApp: true,
};

export const userHandlers = [
  // GET /api/users/me/profile
  http.get('/api/users/me/profile', () => {
    return HttpResponse.json(mockProfile);
  }),

  // PATCH /api/users/me/profile
  http.patch('/api/users/me/profile', async ({ request }) => {
    const data = (await request.json()) as Partial<User>;
    mockProfile = { ...mockProfile, ...data };
    return HttpResponse.json(mockProfile);
  }),

  // GET /api/users/me/settings/notifications
  http.get('/api/users/me/settings/notifications', () => {
    return HttpResponse.json(mockNotificationSettings);
  }),

  // PATCH /api/users/me/settings/notifications
  http.patch('/api/users/me/settings/notifications', async ({ request }) => {
    const data = (await request.json()) as Partial<NotificationSettings>;
    mockNotificationSettings = { ...mockNotificationSettings, ...data };
    return HttpResponse.json(mockNotificationSettings);
  }),
];
