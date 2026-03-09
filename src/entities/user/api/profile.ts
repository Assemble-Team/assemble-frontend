import { apiClient } from '@/shared/api/apiClient';
import { User } from '../model/types';

/**
 * 내 프로필 정보를 불러옵니다.
 * GET /users/me/profile
 */
export const getMyProfile = async () => {
  return apiClient.get('users/me/profile').json<User>();
};

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  avatarUrl?: string;
}

/**
 * 내 프로필 정보를 수정합니다.
 * PATCH /users/me/profile
 */
export const updateMyProfile = async (data: UpdateProfileRequest) => {
  return apiClient.patch('users/me/profile', { json: data }).json<User>();
};
