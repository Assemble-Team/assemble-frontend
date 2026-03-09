import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const GroupMembers = dynamic(() =>
  import('@/features/groups-members').then((mod) => mod.GroupMembers)
);

export default async function GroupMembersPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id: groupId } = await props.params;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
      <Suspense
        fallback={
          <div className="grid animate-pulse gap-4 sm:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 w-full rounded-3xl bg-slate-100" />
            ))}
          </div>
        }
      >
        <GroupMembers groupId={groupId} />
      </Suspense>
    </div>
  );
}
