'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { useCreateBoardPost } from '@/entities/groups';
import { X } from 'lucide-react';

const postSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.').max(100, '제목은 100자 이내로 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

type PostFormValues = z.infer<typeof postSchema>;

interface GroupBoardWriteFormProps {
  groupId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const GroupBoardWriteForm = ({ groupId, onSuccess, onCancel }: GroupBoardWriteFormProps) => {
  const { mutate: createPost, isPending } = useCreateBoardPost(groupId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = (data: PostFormValues) => {
    createPost(data, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">새 게시글 작성</h3>
        <button
          onClick={onCancel}
          className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">제목</label>
          <Input
            {...register('title')}
            placeholder="제목을 입력하세요"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-xs font-medium text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">내용</label>
          <Textarea
            {...register('content')}
            placeholder="함께 나누고 싶은 이야기를 적어보세요."
            className={`min-h-[200px] ${errors.content ? 'border-red-500' : ''}`}
          />
          {errors.content && (
            <p className="text-xs font-medium text-red-500">{errors.content.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="rounded-full font-black"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="rounded-full font-black px-8"
          >
            {isPending ? '작성 중...' : '등록하기'}
          </Button>
        </div>
      </form>
    </div>
  );
};
