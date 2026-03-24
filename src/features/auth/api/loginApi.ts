import { apiClient } from '@/shared/api/apiClient';
import { LoginFormValues } from '../model/authSchema';

export interface LoginResult {
  memberId: number;
  refreshToken: string;
  createdAt: string;
  accessToken: string;
}

/**
 * 로그인
 * POST /auth/login
 * 
 * 명세:
 * - AccessToken은 응답 헤더(Authorization)에 포함됨
 * - 그 외 정보는 응답 바디(result)에 포함됨
 */
export const login = async (data: LoginFormValues): Promise<LoginResult> => {
  const response = await apiClient.post('auth/login', { json: data });
  
  // 헤더에서 AccessToken 추출
  const authHeader = response.headers.get('Authorization');
  const accessToken = authHeader?.replace('Bearer ', '') || '';
  
  // 바디에서 나머지 데이터 추출
  const result = await response.json<Omit<LoginResult, 'accessToken'>>();
  
  return {
    ...result,
    accessToken,
  };
};

/**
 * 토큰 재발급
 * POST /auth/reissue
 */
export const reissueToken = async (refreshToken: string): Promise<string> => {
  const response = await apiClient.post('auth/reissue', { json: { refreshToken } });

  const authHeader = response.headers.get('Authorization');
  const accessToken = authHeader?.replace('Bearer ', '') || '';

  return accessToken;
};

/**
 * 로그아웃
 * POST /auth/logout
 */
export const logout = async (): Promise<void> => {
  return apiClient.post('auth/logout').json<void>();
};

/**
 * 회원 탈퇴
 * DELETE /auth/me
 */
export const withdraw = async (): Promise<void> => {
  return apiClient.delete('auth/me').json<void>();
};


