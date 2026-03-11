'use client';

import dynamic from 'next/dynamic';

const JoinedGroupList = dynamic(
  () => import('./JoinedGroupList').then((mod) => mod.JoinedGroupList),
  {
    ssr: false,
    loading: () => <div className="h-40 w-full animate-pulse rounded-[2.5rem] bg-slate-100" />,
  }
);

export { JoinedGroupList };
