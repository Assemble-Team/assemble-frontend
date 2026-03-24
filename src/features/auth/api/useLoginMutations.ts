'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/shared/model/auth/store';
import { useUserStore } from '@/entities/user';
import { ApiError } from '@/shared/api/ApiError';
import { ROUTES } from '@/shared/constants/routes';

import { login, logout, withdraw } from './loginApi';
import type { LoginFormValues } from '../model/authSchema';
import type { LoginResult } from './loginApi';

/**
 * 로그인 Mutation
 */
export const useLoginMutation = (options?: {
  onSuccess?: (data: LoginResult) => void;
}) => {
  const queryClient = useQueryClient();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useUserStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginFormValues) => login(data),
    onSuccess: (data) => {
      const { accessToken, refreshToken, memberId } = data;
      
      // 1. Zustand 스토어에 토큰 저장
      setTokens({ accessToken, refreshToken });
      
      // 2. 사용자 정보 저장 (id만 우선 저장)
      setUser({ id: memberId, name: '사용자', email: '' });
      
      // 3. 모든 쿼리 무효화하여 인증 상태 반영
      queryClient.invalidateQueries();

      alert('로그인에 성공했습니다!');
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });
};

/**
 * 로그아웃 Mutation
 */
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const clearUser = useUserStore((state) => state.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      clearTokens();
      clearUser();
      queryClient.invalidateQueries(); // 인증 상태 반영
      
      alert('로그아웃 되었습니다.');
      router.push(ROUTES.HOME);
    },
    onError: () => {
      alert('로그아웃 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 회원탈퇴 Mutation
 */
export const useWithdrawMutation = () => {
  const queryClient = useQueryClient();
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const clearUser = useUserStore((state) => state.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: () => withdraw(),
    onSuccess: () => {
      clearTokens();
      clearUser();
      queryClient.invalidateQueries();

      alert('회원 탈퇴가 완료되었습니다.');
      router.push(ROUTES.HOME);
    },
    onError: (error) => {
       if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert('회원 탈퇴 중 오류가 발생했습니다.');
      }
    },
  });
};
