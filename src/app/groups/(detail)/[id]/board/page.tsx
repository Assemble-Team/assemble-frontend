import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const GroupBoard = dynamic(() =>
  import('@/features/groups-board').then((mod) => mod.GroupBoard)
);

export default async function GroupBoardPage(props: {
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
        <GroupBoard groupId={groupId} />
      </Suspense>
    </div>
  );
}
