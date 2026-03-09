'use client';

import { useGroupDetail } from '@/entities/groups';
import { NoticeList } from '@/widgets/group-notice/ui/NoticeList';
import { NoticeWriteButton } from '@/features/groups-notice/ui/NoticeWriteButton';
import { Megaphone } from 'lucide-react';

export const NoticePageContent = ({ groupId }: { groupId: string }) => {
  const { data: group } = useGroupDetail(groupId);

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
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

      {/* 리스트 섹션 */}
      <NoticeList groupId={groupId} />
    </div>
  );
};
