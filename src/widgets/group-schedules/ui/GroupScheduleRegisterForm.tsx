'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { useCreateGroupSchedule } from '@/entities/groups';
import { X, Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';

const scheduleSchema = z.object({
  title: z.string().min(1, '일정 제목을 입력해주세요.').max(100, '제목은 100자 이내로 입력해주세요.'),
  content: z.string().min(1, '일정 내용을 입력해주세요.'),
  date: z.string().min(1, '날짜를 선택해주세요.'),
  time: z.string().min(1, '시간을 입력해주세요.'),
  location: z.string().min(1, '장소를 입력해주세요.'),
  maxParticipants: z.coerce.number().min(2, '최소 2명 이상이어야 합니다.'),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

interface GroupScheduleRegisterFormProps {
  groupId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const GroupScheduleRegisterForm = ({
  groupId,
  onSuccess,
  onCancel,
}: GroupScheduleRegisterFormProps) => {
  const { mutate: createSchedule, isPending } = useCreateGroupSchedule(groupId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      location: '',
      maxParticipants: 10,
    },
  });

  const onSubmit = (data: ScheduleFormValues) => {
    createSchedule(data, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">새 일정 등록</h3>
        <button
          onClick={onCancel}
          className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">일정 제목</label>
          <Input
            {...register('title')}
            placeholder="예: 정기 운동 모임, 회식 등"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-xs font-medium text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
              <CalendarIcon size={14} /> 날짜
            </label>
            <Input
              type="date"
              {...register('date')}
              className={errors.date ? 'border-red-500' : ''}
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
              <Clock size={14} /> 시간
            </label>
            <Input
              type="time"
              {...register('time')}
              className={errors.time ? 'border-red-500' : ''}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
            <MapPin size={14} /> 장소
          </label>
          <Input
            {...register('location')}
            placeholder="모임 장소를 입력하세요"
            className={errors.location ? 'border-red-500' : ''}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
            <Users size={14} /> 최대 인원
          </label>
          <Input
            type="number"
            {...register('maxParticipants')}
            className={errors.maxParticipants ? 'border-red-500' : ''}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">설명</label>
          <Textarea
            {...register('content')}
            placeholder="일정에 대한 상세 내용을 입력하세요."
            className={`min-h-[120px] ${errors.content ? 'border-red-500' : ''}`}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
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
            {isPending ? '등록 중...' : '일정 등록하기'}
          </Button>
        </div>
      </form>
    </div>
  );
};
