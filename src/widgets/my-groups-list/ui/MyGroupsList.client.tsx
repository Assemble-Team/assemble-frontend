'use client';

import dynamic from 'next/dynamic';

const MyGroupsList = dynamic(
  () => import('./MyGroupsList').then((mod) => mod.MyGroupsList),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-64 w-full animate-pulse rounded-[2.5rem] bg-slate-100"
          />
        ))}
      </div>
    ),
  }
);

export { MyGroupsList };
