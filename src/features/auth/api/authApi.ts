import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/api/types';
import { SignupFormValues, LoginFormValues } from '../model/authSchema';

export interface SignupResult {
  id: number;
  createdAt: string;
}

export interface LoginResult {
  accessToken: string;
  id: number;
}

export type AuthResponse = ApiResponse<SignupResult>;

export const authApi = {
  signup: async (data: SignupFormValues): Promise<ApiResponse<SignupResult>> => {
    return apiClient.post('auth/signup', { json: data }).json<ApiResponse<SignupResult>>();
  },

  login: async (data: LoginFormValues): Promise<ApiResponse<LoginResult>> => {
    return apiClient.post('auth/login', { json: data }).json<ApiResponse<LoginResult>>();
  },
};
