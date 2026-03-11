'use client';

import { usePendingGroups } from '@/entities/groups';
import { GroupCard } from '@/entities/groups/ui/GroupCard';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';

function PendingGroupListContent() {
  const { data: groups } = usePendingGroups();

  if (groups.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-slate-200 bg-slate-50 text-slate-400">
        <p className="text-sm font-medium">현재 승인 대기중인 모임이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-8 px-2">
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          overlay={
            <div className="flex flex-col items-center justify-center p-1 text-center">
              <span className="text-[10px] font-black text-white uppercase drop-shadow-md">
                승인 대기
              </span>
            </div>
          }
        />
      ))}
    </div>
  );
}

function PendingGroupListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-8 px-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex animate-pulse flex-col gap-3">
          <div className="aspect-video w-full rounded-2xl bg-slate-100" />
          <div className="space-y-2 px-1">
            <div className="h-4 w-2/3 rounded-full bg-slate-50" />
            <div className="h-3 w-1/2 rounded-full bg-slate-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * [Widget] 승인 대기중 모임 목록
 * AsyncBoundary를 통해 로딩 및 에러 상태를 처리합니다.
 */
export function PendingGroupList() {
  return (
    <AsyncBoundary loadingFallback={<PendingGroupListSkeleton />}>
      <PendingGroupListContent />
    </AsyncBoundary>
  );
}
