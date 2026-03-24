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
import { useLoginMutation } from '../api/useLoginMutations';

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isPending } = useLoginMutation({
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      } else {
        router.replace(ROUTES.HOME);
      }
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
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
          disabled={isPending}
          size="lg"
          className="mt-2 w-full justify-center text-base font-bold"
        >
          {isPending ? '로그인 중...' : '로그인'}
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
