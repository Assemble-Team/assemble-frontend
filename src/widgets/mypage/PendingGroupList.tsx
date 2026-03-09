'use client';

import { Suspense } from 'react';
import { usePendingGroups } from '@/entities/groups';
import { GroupListItem } from '@/entities/groups';

function PendingGroupListContent() {
  const { data: groups } = usePendingGroups();

  if (groups.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-slate-200 bg-slate-50 text-slate-400">
        <p className="text-sm font-medium">
          현재 승인 대기중인 모임이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-8 px-2">
      {groups.map((group) => (
        <GroupListItem
          key={group.id}
          group={group}
          overlay={
            <div className="flex flex-col items-center justify-center p-1 text-center">
              <span className="text-[10px] leading-tight font-black text-white uppercase drop-shadow-md">
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
 * - entities/groups의 usePendingGroups 훅과 GroupListItem 컴포넌트를 조합합니다.
 * - 각 카드 위에 "승인 대기" 오버레이 배지를 표시하여 대기 상태를 명확히 합니다.
 */
export function PendingGroupList() {
  return (
    <Suspense fallback={<PendingGroupListSkeleton />}>
      <PendingGroupListContent />
    </Suspense>
  );
}
