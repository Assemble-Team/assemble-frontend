import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const NoticePageContent = dynamic<{ groupId: string }>(() =>
  import('./NoticePageContent').then((mod) => mod.NoticePageContent)
);

export default async function GroupNoticePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id: groupId } = await props.params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <Suspense
        fallback={
          <div className="animate-pulse space-y-6">
            <div className="h-20 w-full rounded-4xl bg-slate-100" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 w-full rounded-4xl bg-slate-100" />
              ))}
            </div>
          </div>
        }
      >
        <NoticePageContent groupId={groupId} />
      </Suspense>
    </div>
  );
}
