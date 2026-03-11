'use client';

import dynamic from 'next/dynamic';

const MyCommentList = dynamic(
  () => import('./MyCommentList').then((mod) => mod.MyCommentList),
  { ssr: false }
);

export { MyCommentList };
