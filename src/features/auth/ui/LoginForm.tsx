'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';

import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/Button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/InputGroup';
import { FormField } from '@/shared/ui/FormField';
import { ApiError } from '@/shared/api/ApiError';

import { loginSchema, LoginFormValues } from '../model/authSchema';
import { authApi } from '../api/authApi';
import { useUserStore } from '@/entities/user';

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await authApi.login(data);
      // 성공 시 스토어 업데이트
      login({
        id: res.id,
        email: data.email,
        name: '사용자', // 실제 이름 데이터가 명세에 없으므로 일단 고정
      });
      alert('로그인에 성공했습니다!');

      if (onSuccess) {
        onSuccess();
      } else {
        router.replace(ROUTES.HOME);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-xl font-bold">환영합니다! 👋</h2>
        <p className="text-sm text-gray-500">
          서비스를 이용하려면 로그인이 필요해요.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField label="이메일" error={errors.email?.message}>
          <InputGroup>
            <InputGroupAddon>
              <Mail className="h-4 w-4 text-gray-400" />
            </InputGroupAddon>
            <InputGroupInput
              {...register('email')}
              type="email"
              placeholder="이메일"
            />
          </InputGroup>
        </FormField>

        <FormField label="비밀번호" error={errors.password?.message}>
          <InputGroup>
            <InputGroupAddon>
              <Lock className="h-4 w-4 text-gray-400" />
            </InputGroupAddon>
            <InputGroupInput
              {...register('password')}
              type="password"
              placeholder="비밀번호"
            />
          </InputGroup>
        </FormField>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 justify-center py-6 text-base font-bold"
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <div className="flex items-center justify-between px-1 text-sm text-gray-500">
        <Link
          href={ROUTES.AUTH.FIND_PASSWORD}
          className="hover:text-gray-800 hover:underline"
          replace
        >
          비밀번호 찾기
        </Link>
        <Link
          href={ROUTES.AUTH.SIGNUP}
          className="hover:text-gray-800 hover:underline"
          replace
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
