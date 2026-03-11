'use client';

import { useJoinedGroups } from '@/entities/groups';
import { JoinedGroupCard } from '@/entities/groups/ui/JoinedGroupCard';
import { Sparkles } from 'lucide-react';
import { type JoinedGroup } from '@/entities/groups';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';

const MyGroupsListContent = () => {
  const { data: groups } = useJoinedGroups();

  if (groups.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
        <div className="text-brand-400 rounded-full bg-white p-4 shadow-sm">
          <Sparkles size={32} />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-black text-slate-900">아직 가입한 모임이 없네요!</p>
          <p className="font-medium text-slate-400">새로운 모임에 참여하여 활동을 시작해보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group: JoinedGroup) => (
        <JoinedGroupCard key={group.id} group={group} />
      ))}
    </main>
  );
};

export const MyGroupsList = () => {
  return (
    <AsyncBoundary
      loadingFallback={
        <div className="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 w-full animate-pulse rounded-[2.5rem] bg-slate-100" />
          ))}
        </div>
      }
    >
      <MyGroupsListContent />
    </AsyncBoundary>
  );
};
