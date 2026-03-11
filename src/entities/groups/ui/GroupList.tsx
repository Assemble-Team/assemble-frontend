'use client';

import { useGroupList } from '../api/useGroupList';
import { GroupCard } from './GroupCard';

/**
 * 모임 목록을 그리드 형태로 렌더링하는 엔티티 컴포넌트입니다.
 * 비대한 GroupListItem 대신 정석적인 GroupCard를 사용합니다.
 */
export function GroupList() {
  const { data: groups } = useGroupList();

  if (!groups || groups.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/50">
        <p className="font-bold text-slate-400">해당 조건에 맞는 모임이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
}
