'use client';

import { useGroupList } from '../api/useGroupList';
import { GroupListItem } from './GroupListItem';

export function GroupList() {
  const { data: groups } = useGroupList();

  return (
    <div className="flex flex-col gap-6">
      {groups && groups.length > 0 ? (
        <main className="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {groups.map((group) => (
            <GroupListItem key={group.id} group={group} />
          ))}
        </main>
      ) : (
        <div className="py-20 text-center text-slate-500">
          해당 조건에 맞는 모임이 없습니다.
        </div>
      )}
    </div>
  );
}
