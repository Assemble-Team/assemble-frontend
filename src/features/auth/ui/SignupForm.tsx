'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock, Mail, User } from 'lucide-react';

import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/Button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/InputGroup';
import { FormField } from '@/shared/ui/FormField';
import { cn } from '@/shared/lib/utils';

import {
  signupSchema,
  SignupFormValues,
  CATEGORIES,
} from '../model/authSchema';
import { useUserStore } from '@/entities/user';
import {
  useRequestEmailMutation,
  useVerifyCodeMutation,
  useSignupMutation,
} from '../api/useSignupMutations';

const CATEGORY_LABELS: Record<string, string> = {
  STUDY: '스터디',
  EXERCISE: '운동',
  PROJECT: '프로젝트',
  HOBBY: '취미',
  CULTURE_ART: '문화/예술',
};

interface SignupFormProps {
  onSuccess?: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const router = useRouter();
  const login = useUserStore((state) => state.login);

  // 이메일 인증 관련 상태 (UI 제어용)
  const [isEmailRequested, setIsEmailRequested] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      categories: [],
    },
  });

  const selectedCategories = watch('categories');
  const email = watch('email');

  // Mutation Hooks
  const requestEmailMutation = useRequestEmailMutation({
    onSuccess: () => setIsEmailRequested(true),
  });

  const verifyCodeMutation = useVerifyCodeMutation({
    onSuccess: () => setIsEmailVerified(true),
  });

  const signupMutation = useSignupMutation({
    onSuccess: (res, variables) => {
      login({
        id: res.id,
        email: variables.email,
        name: variables.name,
      });
      if (onSuccess) {
        onSuccess();
      } else {
        router.replace(ROUTES.HOME);
      }
    },
  });

  const toggleCategory = (category: (typeof CATEGORIES)[number]) => {
    const current = selectedCategories || [];
    const next = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    setValue('categories', next, { shouldValidate: true });
  };

  const handleRequestEmail = () => {
    if (!email || errors.email) {
      alert('유효한 이메일을 입력해주세요.');
      return;
    }
    requestEmailMutation.mutate(email);
  };

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      alert('6자리 인증번호를 입력해주세요.');
      return;
    }
    verifyCodeMutation.mutate({ email, code: verificationCode });
  };

  const onSubmit = (data: SignupFormValues) => {
    if (!isEmailVerified) {
      alert('이메일 인증을 먼저 완료해주세요.');
      return;
    }
    signupMutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-xl font-bold">회원가입 🚀</h2>
        <p className="text-sm text-gray-500">
          새로운 계정을 만들고 시작해보세요.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField label="이름" required error={errors.name?.message}>
          <InputGroup>
            <InputGroupAddon>
              <User className="h-4 w-4 text-gray-400" />
            </InputGroupAddon>
            <InputGroupInput
              {...register('name')}
              type="text"
              placeholder="이름 (닉네임)"
            />
          </InputGroup>
        </FormField>

        <FormField label="이메일" required error={errors.email?.message}>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2">
              <InputGroup className="w-full">
                <InputGroupAddon>
                  <Mail className="h-4 w-4 text-gray-400" />
                </InputGroupAddon>
                <InputGroupInput
                  {...register('email')}
                  type="email"
                  placeholder="이메일"
                  readOnly={isEmailVerified}
                  className={cn(isEmailVerified && 'bg-gray-50 text-gray-500')}
                />
              </InputGroup>
              <Button
                type="button"
                variant={isEmailVerified ? 'ghost' : 'outline'}
                className="shrink-0"
                onClick={handleRequestEmail}
                disabled={
                  isEmailVerified ||
                  requestEmailMutation.isPending ||
                  isEmailRequested
                }
              >
                {isEmailVerified ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : requestEmailMutation.isPending ? (
                  '발송 중...'
                ) : isEmailRequested ? (
                  '재발송'
                ) : (
                  '인증'
                )}
              </Button>
            </div>

            {/* 인증번호 입력란 - 요청 시에만 노출 */}
            {isEmailRequested && !isEmailVerified && (
              <div className="flex gap-x-2 animate-in fade-in slide-in-from-top-1">
                <InputGroup className="w-full">
                  <InputGroupInput
                    type="text"
                    placeholder="인증번호 6자리"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </InputGroup>
                <Button
                  type="button"
                  variant="primary"
                  className="shrink-0"
                  onClick={handleVerifyCode}
                  disabled={
                    verifyCodeMutation.isPending || verificationCode.length !== 6
                  }
                >
                  {verifyCodeMutation.isPending ? '확인 중...' : '확인'}
                </Button>
              </div>
            )}
          </div>
        </FormField>

        <FormField label="비밀번호" required error={errors.password?.message}>
          <InputGroup>
            <InputGroupAddon>
              <Lock className="h-4 w-4 text-gray-400" />
            </InputGroupAddon>
            <InputGroupInput
              {...register('password')}
              type="password"
              placeholder="비밀번호 (영문, 숫자 포함 8자 이상)"
            />
          </InputGroup>
        </FormField>

        <FormField
          label="비밀번호 확인"
          required
          error={errors.confirmPassword?.message}
        >
          <InputGroup>
            <InputGroupAddon>
              <Lock className="h-4 w-4 text-gray-400" />
            </InputGroupAddon>
            <InputGroupInput
              {...register('confirmPassword')}
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
          </InputGroup>
        </FormField>

        <FormField
          label="관심 카테고리 (중복 선택 가능)"
          required
          error={errors.categories?.message}
        >
          <div className="flex flex-wrap gap-2 pt-1">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategories?.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-xs font-semibold transition-all',
                    isSelected
                      ? 'border-brand-500 bg-brand-50 text-brand-600'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  {CATEGORY_LABELS[category]}
                </button>
              );
            })}
          </div>
        </FormField>

        <Button
          type="submit"
          disabled={signupMutation.isPending || !isEmailVerified}
          className="mt-2 justify-center py-6 text-base font-bold"
        >
          {signupMutation.isPending ? '처리 중...' : '회원가입 완료'}
        </Button>
      </form>

      <div className="flex justify-center text-sm text-gray-500">
        이미 계정이 있으신가요?
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="ml-2 underline hover:text-gray-800"
          replace
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
}
