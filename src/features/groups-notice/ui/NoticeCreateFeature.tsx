'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useGroupDetail } from '@/entities/groups';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { FormField } from '@/shared/ui/FormField';
import { Switch } from '@/shared/ui/Toggle';
import { ChevronLeft } from 'lucide-react';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';

const NoticeCreateSchema = z.object({
  title: z.string().min(2, '제목은 2자 이상 입력해주세요.'),
  content: z.string().min(5, '내용은 5자 이상 입력해주세요.'),
  isFixed: z.boolean(),
});

type NoticeFormValues = z.infer<typeof NoticeCreateSchema>;

interface NoticeCreateFeatureProps {
  groupId: string;
}

const NoticeCreateForm = ({ groupId }: NoticeCreateFeatureProps) => {
  const router = useRouter();
  const { data: group } = useGroupDetail(groupId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NoticeFormValues>({
    resolver: zodResolver(NoticeCreateSchema),
    defaultValues: {
      title: '',
      content: '',
      isFixed: false,
    },
  });

  const isFixed = watch('isFixed');

  if (group.myRole !== 'LEADING') {
    if (typeof window !== 'undefined') {
      alert('공지 작성 권한이 없습니다.');
      router.replace(`/groups/${groupId}/notice`);
    }
    return null;
  }

  const onSubmit = async (data: NoticeFormValues) => {
    try {
      console.log('공지 작성 데이터:', { ...data, groupId });
      alert('공지가 성공적으로 작성되었습니다.');
      router.back();
    } catch (error) {
      alert('공지 작성에 실패했습니다.');
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-slate-900">새 공지사항 작성</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField label="공지 제목" error={errors.title?.message}>
          <Input
            placeholder="공지사항의 제목을 입력해주세요"
            {...register('title')}
          />
        </FormField>

        <FormField label="공지 내용" error={errors.content?.message}>
          <Textarea
            placeholder="함께 활동하는 멤버들에게 알릴 내용을 상세히 작성해주세요"
            rows={10}
            className="resize-none"
            {...register('content')}
          />
        </FormField>

        <div className="flex items-center justify-between rounded-[2rem] bg-slate-50 p-6">
          <div>
            <h4 className="font-black text-slate-900">상단 고정</h4>
            <p className="text-sm font-medium text-slate-400">
              리스트 최상단에 고정합니다.
            </p>
          </div>
          <Switch
            checked={isFixed}
            onCheckedChange={(checked) => setValue('isFixed', checked)}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-full py-4 font-black"
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button
            type="submit"
            className="flex-1 rounded-full py-4 font-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? '작성 중...' : '공지 올리기'}
          </Button>
        </div>
      </form>
    </div>
  );
};

/**
 * 모임 공지사항을 작성하는 핵심 기능(Feature)입니다.
 * AsyncBoundary를 내장하여 스스로 로딩과 에러를 관리합니다.
 */
export const NoticeCreateFeature = (props: NoticeCreateFeatureProps) => {
  return (
    <AsyncBoundary
      loadingFallback={
        <div className="mx-auto max-w-2xl animate-pulse space-y-8">
          <div className="h-10 w-48 rounded-full bg-slate-100" />
          <div className="space-y-6">
            <div className="h-20 w-full rounded-3xl bg-slate-100" />
            <div className="h-64 w-full rounded-3xl bg-slate-100" />
            <div className="h-20 w-full rounded-3xl bg-slate-100" />
          </div>
        </div>
      }
    >
      <NoticeCreateForm {...props} />
    </AsyncBoundary>
  );
};
