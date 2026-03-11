'use client';

import dynamic from 'next/dynamic';

const RecentScheduleList = dynamic(
  () => import('./RecentScheduleList').then((mod) => mod.RecentScheduleList),
  {
    ssr: false,
    loading: () => <div className="h-64 w-full animate-pulse rounded-[2.5rem] bg-slate-100" />,
  }
);

export { RecentScheduleList };
