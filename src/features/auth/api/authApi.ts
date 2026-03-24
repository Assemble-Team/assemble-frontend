import { apiClient } from '@/shared/api/apiClient';
import { SignupRequest, LoginFormValues } from '../model/authSchema';

export interface SignupResult {
  id: number;
  createdAt: string;
}

export interface LoginResult {
  accessToken: string;
  id: number;
}

export const authApi = {
  /**
   * 이메일 인증 요청
   * POST /api/members/email
   */
  requestEmailVerification: async (email: string): Promise<void> => {
    return apiClient
      .post('api/members/email', { json: { email } })
      .json<void>();
  },

  /**
   * 회원가입
   * POST /api/members/signup
   */
  signup: async (data: SignupRequest): Promise<SignupResult> => {
    return apiClient
      .post('api/members/signup', { json: data })
      .json<SignupResult>();
  },

  /**
   * 로그인
   * POST auth/login (기존 유지)
   */
  login: async (data: LoginFormValues): Promise<LoginResult> => {
    return apiClient.post('auth/login', { json: data }).json<LoginResult>();
  },
};
