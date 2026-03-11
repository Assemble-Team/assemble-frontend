'use client';

import { useGroupDetail } from '@/entities/groups';
import { NoticeList } from './NoticeList';
import { NoticeWriteButton } from '@/features/groups-notice/ui/NoticeWriteButton';
import { Megaphone } from 'lucide-react';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';

interface NoticeListWidgetProps {
  groupId: string;
}

const NoticeListContent = ({ groupId }: NoticeListWidgetProps) => {
  const { data: group } = useGroupDetail(groupId);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-50 text-brand-600 flex h-12 w-12 items-center justify-center rounded-2xl">
            <Megaphone size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">공지사항</h2>
            <p className="text-sm font-medium text-slate-400">
              {group.title} 모임의 중요 소식을 전해드립니다.
            </p>
          </div>
        </div>
        <NoticeWriteButton myRole={group.myRole} />
      </div>
      <NoticeList groupId={groupId} />
    </div>
  );
};

/**
 * 모임 내 공지사항 목록을 보여주는 통합 위젯입니다.
 * AsyncBoundary를 통해 로딩 및 에러 상태를 자체적으로 관리합니다.
 */
export const NoticeListWidget = (props: NoticeListWidgetProps) => {
  return (
    <AsyncBoundary
      loadingFallback={
        <div className="animate-pulse space-y-6">
          <div className="h-20 w-full rounded-4xl bg-slate-100" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 w-full rounded-4xl bg-slate-100" />
            ))}
          </div>
        </div>
      }
    >
      <NoticeListContent {...props} />
    </AsyncBoundary>
  );
};
