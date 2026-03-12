'use client';

import dynamic from 'next/dynamic';

const ProfileEditForm = dynamic(
  () => import('@/features/mypage').then((mod) => mod.ProfileEditForm),
  { ssr: false }
);

export { ProfileEditForm };
