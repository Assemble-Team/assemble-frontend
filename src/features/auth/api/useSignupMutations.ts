'use client';

import { useMutation } from '@tanstack/react-query';
import { signup, requestEmailVerification, verifyEmailCode } from './signupApi';
import { SignupFormValues } from '../model/authSchema';
import { ApiError } from '@/shared/api/ApiError';

/**
 * 이메일 인증 요청 Mutation
 */
export const useRequestEmailMutation = (options?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: (email: string) => requestEmailVerification(email),
    onSuccess: () => {
      alert('인증 이메일이 발송되었습니다. 이메일을 확인해주세요!');
      options?.onSuccess?.();
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert('이메일 인증 요청 중 오류가 발생했습니다.');
      }
    },
  });
};

/**
 * 이메일 인증번호 확인 Mutation
 */
export const useVerifyCodeMutation = (options?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyEmailCode(email, code),
    onSuccess: () => {
      alert('이메일 인증이 완료되었습니다.');
      options?.onSuccess?.();
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert('인증번호가 올바르지 않거나 만료되었습니다.');
      }
    },
  });
};

/**
 * 회원가입 Mutation
 */
export const useSignupMutation = (options?: {
  onSuccess?: (data: any, variables: SignupFormValues) => void;
}) => {
  return useMutation({
    mutationFn: (data: SignupFormValues) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...signupData } = data;
      return signup(signupData);
    },
    onSuccess: (res, variables) => {
      alert('회원가입이 완료되었습니다!');
      options?.onSuccess?.(res, variables);
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });
};
