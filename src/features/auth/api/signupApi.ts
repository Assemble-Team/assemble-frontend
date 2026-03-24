import { apiClient } from '@/shared/api/apiClient';
import { SignupRequest } from '../model/authSchema';

export interface SignupResult {
  id: number;
  createdAt: string;
}

/**
 * 이메일 인증 요청
 * POST /members/email
 */
export const requestEmailVerification = async (email: string): Promise<void> => {
  return apiClient.post('members/email', { json: { email } }).json<void>();
};

/**
 * 이메일 인증번호 확인
 * POST /members/email/check
 */
export const verifyEmailCode = async (email: string, code: string): Promise<void> => {
  return apiClient.post('members/email/check', { json: { email, code } }).json<void>();
};

/**
 * 회원가입
 * POST /members/signup
 */
export const signup = async (data: SignupRequest): Promise<SignupResult> => {
  return apiClient.post('members/signup', { json: data }).json<SignupResult>();
};
