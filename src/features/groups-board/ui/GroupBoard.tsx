'use client';

import { useGroupDetail } from '@/entities/groups';
import { MessageSquare, PenLine } from 'lucide-react';
import Button from '@/shared/ui/Button/Button';

interface GroupBoardProps {
  groupId: string;
}

export const GroupBoard = ({ groupId }: GroupBoardProps) => {
  const { data: group } = useGroupDetail(groupId);

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-600">
            <MessageSquare size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">자유 게시판</h2>
            <p className="text-sm font-medium text-slate-400">
              {group.title} 멤버들과 자유롭게 이야기를 나누세요.
            </p>
          </div>
        </div>

        <Button
          className="gap-2 rounded-full font-black"
          onClick={() => alert('글쓰기 기능은 준비 중입니다.')}
        >
          <PenLine size={18} />
          글쓰기
        </Button>
      </div>

      {/* 리스트 섹션 (빈 상태) */}
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-slate-200 bg-slate-50/30 p-8 text-center">
        <div className="rounded-full bg-white p-4 text-slate-200 shadow-sm">
          <MessageSquare size={32} />
        </div>
        <div className="space-y-1">
          <p className="text-xl font-black text-slate-900">
            아직 게시글이 없습니다.
          </p>
          <p className="font-medium text-slate-400">
            첫 번째 이야기를 들려주세요!
          </p>
        </div>
      </div>
    </div>
  );
};
