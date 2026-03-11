'use client';

import dynamic from 'next/dynamic';

const LikedGroupList = dynamic(
  () => import('./LikedGroupList').then((mod) => mod.LikedGroupList),
  { ssr: false }
);

export { LikedGroupList };
