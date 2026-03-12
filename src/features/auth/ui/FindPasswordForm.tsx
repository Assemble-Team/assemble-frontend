'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Mail } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/Button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/InputGroup';
import { FormField } from '@/shared/ui/FormField';

import {
  findPasswordSchema,
  FindPasswordFormValues,
} from '../model/authSchema';

interface FindPasswordFormProps {
  onSuccess?: () => void;
}

export default function FindPasswordForm({ onSuccess }: FindPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FindPasswordFormValues>({
    resolver: zodResolver(findPasswordSchema),
  });

  const onSubmit = async (data: FindPasswordFormValues) => {
    try {
      // 실제 API 연동 시 authApi.findPassword(data) 호출 예정
      console.log('Find password for:', data.email);
      alert('재설정 링크가 이메일로 발송되었습니다.');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-xl font-bold">비밀번호 찾기 🔒</h2>
        <p className="text-sm text-gray-500">
          가입한 이메일을 입력하시면 재설정 링크를 보내드려요.
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 justify-center py-6 text-base font-bold"
        >
          {isSubmitting ? '발송 중...' : '재설정 이메일 보내기'}
        </Button>
      </form>

      <div className="flex justify-center">
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800 hover:underline"
          replace
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
