'use client';

import dynamic from 'next/dynamic';

const MyPostList = dynamic(
  () => import('./MyPostList').then((mod) => mod.MyPostList),
  { ssr: false }
);

export { MyPostList };
