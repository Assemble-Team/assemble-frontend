'use client';

import { useGroupDetail } from '@/entities/groups';
import { Calendar, Plus } from 'lucide-react';
import Button from '@/shared/ui/Button/Button';

interface GroupSchedulesProps {
  groupId: string;
}

export const GroupSchedules = ({ groupId }: GroupSchedulesProps) => {
  const { data: group } = useGroupDetail(groupId);

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-50 text-brand-600 flex h-12 w-12 items-center justify-center rounded-2xl">
            <Calendar size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">모임 일정</h2>
            <p className="text-sm font-medium text-slate-400">
              {group.title} 모임의 일정을 확인하고 참여하세요.
            </p>
          </div>
        </div>

        <Button
          className="gap-2 rounded-full font-black"
          onClick={() => alert('일정 등록 기능은 준비 중입니다.')}
        >
          <Plus size={18} />
          일정 등록하기
        </Button>
      </div>

      {/* 리스트 섹션 (빈 상태) */}
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-200 bg-slate-50/30 p-8 text-center">
        <div className="rounded-full bg-white p-4 text-slate-200 shadow-sm">
          <Calendar size={32} />
        </div>
        <div className="space-y-1">
          <p className="text-xl font-black text-slate-900">
            예정된 일정이 없습니다.
          </p>
          <p className="font-medium text-slate-400">
            새로운 일정을 등록하여 활발하게 활동해보세요!
          </p>
        </div>
      </div>
    </div>
  );
};
