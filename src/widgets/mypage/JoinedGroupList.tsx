'use client';

import { Suspense } from 'react';
import { JoinedGroupCard, useJoinedGroups } from '@/entities/groups';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';

function JoinedGroupListContent() {
  const { data: groups } = useJoinedGroups();

  if (groups.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-slate-200 bg-slate-50 text-slate-400">
        <p className="text-sm font-medium">아직 가입한 모임이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {groups.map((group) => (
        <JoinedGroupCard key={group.id} group={group} />
      ))}
    </div>
  );
}

function JoinedGroupListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex animate-pulse flex-col gap-3">
          <div className="aspect-video w-full rounded-3xl bg-slate-100" />
          <div className="flex-1 space-y-2 px-1">
            <div className="h-4 w-2/3 rounded-full bg-slate-50" />
            <div className="h-3 w-1/2 rounded-full bg-slate-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * [Widget] 가입한 모임 목록
 * AsyncBoundary를 통해 로딩 및 에러 상태를 처리합니다.
 */
export function JoinedGroupList() {
  return (
    <AsyncBoundary loadingFallback={<JoinedGroupListSkeleton />}>
      <JoinedGroupListContent />
    </AsyncBoundary>
  );
}
