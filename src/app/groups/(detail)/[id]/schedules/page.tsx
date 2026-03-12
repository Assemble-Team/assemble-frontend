import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const GroupSchedules = dynamic(() =>
  import('@/widgets/group-schedules').then((mod) => mod.GroupSchedules)
);

export default async function GroupSchedulesPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id: groupId } = await props.params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <Suspense
        fallback={
          <div className="h-64 w-full animate-pulse rounded-4xl bg-slate-100" />
        }
      >
        <GroupSchedules groupId={groupId} />
      </Suspense>
    </div>
  );
}
