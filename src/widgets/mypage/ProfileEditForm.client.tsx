'use client';

import dynamic from 'next/dynamic';

const ProfileEditForm = dynamic(
  () => import('./ProfileEditForm').then((mod) => mod.ProfileEditForm),
  { ssr: false }
);

export { ProfileEditForm };
