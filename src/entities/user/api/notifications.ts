import { apiClient } from '@/shared/api/apiClient';
import { NotificationSettings } from '../model/types';

/**
 * 내 알림 설정 상태를 불러옵니다.
 * GET /users/me/settings/notifications
 */
export const getNotificationSettings = async () => {
  return apiClient
    .get('users/me/settings/notifications')
    .json<NotificationSettings>();
};

/**
 * 내 알림 설정을 업데이트합니다.
 * PATCH /users/me/settings/notifications
 */
export const updateNotificationSettings = async (
  data: Partial<NotificationSettings>
) => {
  return apiClient
    .patch('users/me/settings/notifications', { json: data })
    .json<NotificationSettings>();
};
