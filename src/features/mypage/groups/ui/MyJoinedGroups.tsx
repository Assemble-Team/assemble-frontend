'use client';

import { useJoinedGroups, type JoinedGroup } from '@/entities/groups';
import { JoinedGroupCard } from '@/entities/groups';

export const MyJoinedGroups = () => {
  const { data: groups } = useJoinedGroups();

  if (groups.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/50">
        <p className="font-bold text-slate-400">아직 가입한 모임이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group: JoinedGroup) => (
        <JoinedGroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};
