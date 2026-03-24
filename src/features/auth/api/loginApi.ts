import { apiClient } from '@/shared/api/apiClient';
import { LoginFormValues } from '../model/authSchema';

export interface LoginResult {
  accessToken: string;
  id: number;
}

/**
 * 로그인
 * POST /auth/login (apiClient의 prefixUrl /api 포함 시 /api/auth/login 호출)
 */
export const login = async (data: LoginFormValues): Promise<LoginResult> => {
  return apiClient.post('auth/login', { json: data }).json<LoginResult>();
};
