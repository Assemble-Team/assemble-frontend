'use client';

import dynamic from 'next/dynamic';

const ActivityFeed = dynamic(
  () => import('./ActivityFeed').then((mod) => mod.ActivityFeed),
  {
    ssr: false,
    loading: () => <div className="h-96 w-full animate-pulse rounded-[2.5rem] bg-slate-100" />,
  }
);

export { ActivityFeed };
