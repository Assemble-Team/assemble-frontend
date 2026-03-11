'use client';

import dynamic from 'next/dynamic';

const PendingGroupList = dynamic(
  () => import('./PendingGroupList').then((mod) => mod.PendingGroupList),
  { ssr: false }
);

export { PendingGroupList };
