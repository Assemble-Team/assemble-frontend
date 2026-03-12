import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const GroupManage = dynamic(() =>
  import('@/widgets/group-manage').then((mod) => mod.GroupManage)
);

export default async function GroupManagePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id: groupId } = await props.params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <Suspense
        fallback={
          <div className="h-96 w-full animate-pulse rounded-4xl bg-slate-100" />
        }
      >
        <GroupManage groupId={groupId} />
      </Suspense>
    </div>
  );
}
