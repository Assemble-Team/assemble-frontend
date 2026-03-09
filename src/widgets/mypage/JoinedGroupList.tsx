'use client';

import { Suspense } from 'react';
import { cn } from '@/shared/lib/utils';
import { useJoinedGroups } from '@/entities/groups';
import { GroupListItem } from '@/entities/groups';

interface JoinedGroupListProps {
  variant?: 'default' | 'compact';
}

function JoinedGroupListContent({ variant = 'default' }: JoinedGroupListProps) {
  const { data: groups } = useJoinedGroups();

  if (groups.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-slate-200 bg-slate-50 text-slate-400">
        <p className="text-sm font-medium">아직 가입한 모임이 없습니다.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-y-6 px-2',
        variant === 'compact'
          ? 'grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-2 gap-x-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      )}
    >
      {groups.map((group) => (
        <GroupListItem key={group.id} group={group} variant={variant} />
      ))}
    </div>
  );
}

function JoinedGroupListSkeleton({
  variant = 'default',
}: JoinedGroupListProps) {
  return (
    <div
      className={cn(
        'grid gap-y-6 px-2',
        variant === 'compact'
          ? 'grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-2 gap-x-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      )}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex animate-pulse gap-3',
            variant === 'compact' ? 'items-center' : 'flex-col'
          )}
        >
          <div
            className={cn(
              'rounded-xl bg-slate-100',
              variant === 'compact'
                ? 'h-16 w-16'
                : 'aspect-video w-full rounded-2xl'
            )}
          />
          <div className="flex-1 space-y-2 px-1">
            <div className="h-4 w-2/3 rounded-full bg-slate-50" />
            <div className="h-3 w-1/2 rounded-full bg-slate-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function JoinedGroupList({ variant = 'default' }: JoinedGroupListProps) {
  return (
    <Suspense fallback={<JoinedGroupListSkeleton variant={variant} />}>
      <JoinedGroupListContent variant={variant} />
    </Suspense>
  );
}
