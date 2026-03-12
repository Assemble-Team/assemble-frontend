'use client';

import { useGroupNotices } from '@/entities/groups/api/useGroupNotices';
import { NoticeCard } from '@/entities/groups/ui/NoticeCard';

import { Megaphone } from 'lucide-react';

interface NoticeListProps {
  groupId: string;
}

export const NoticeList = ({ groupId }: NoticeListProps) => {
  const { data: notices } = useGroupNotices(groupId);

  if (notices.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
        <div className="rounded-full bg-white p-4 text-slate-300 shadow-sm">
          <Megaphone size={32} />
        </div>
        <div className="space-y-1">
          <p className="text-xl font-black text-slate-900">
            등록된 공지사항이 없습니다.
          </p>
          <p className="font-medium text-slate-400">
            중요한 소식을 이곳에서 확인하세요.
          </p>
        </div>
      </div>
    );
  }

  // 고정 게시글을 상단으로 정렬
  const sortedNotices = [...notices].sort((a, b) => {
    if (a.isFixed && !b.isFixed) return -1;
    if (!a.isFixed && b.isFixed) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedNotices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
};
