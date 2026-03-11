'use client';

import dynamic from 'next/dynamic';

const RankingListSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-3 md:gap-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-28 w-full rounded-[2rem] bg-slate-100" />
    ))}
  </div>
);

const RankingList = dynamic(
  () =>
    import('./RankingList').then((mod) => mod.RankingList),
  {
    ssr: false,
    loading: () => <RankingListSkeleton />,
  }
);

export { RankingList };
