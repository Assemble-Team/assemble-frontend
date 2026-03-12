'use client';

import dynamic from 'next/dynamic';

const NotificationSettings = dynamic(
  () => import('./NotificationSettings').then((mod) => mod.NotificationSettings),
  { ssr: false }
);

export { NotificationSettings };
