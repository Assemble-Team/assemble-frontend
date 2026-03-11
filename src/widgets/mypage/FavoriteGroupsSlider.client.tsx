'use client';

import dynamic from 'next/dynamic';

const FavoriteGroupsSlider = dynamic(
  () => import('./FavoriteGroupsSlider').then((mod) => mod.FavoriteGroupsSlider),
  { ssr: false }
);

export { FavoriteGroupsSlider };
