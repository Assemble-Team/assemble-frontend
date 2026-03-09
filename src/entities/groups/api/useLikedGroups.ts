'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getLikedGroups } from './getLikedGroups';
import { Group } from '../model/types';

import { CATEGORY_MAP, LEVEL_MAP } from '../lib/constants';

export const useLikedGroups = () => {
  return useSuspenseQuery({
    queryKey: ['groups', 'liked'],
    queryFn: getLikedGroups,
    select: (data): Group[] =>
      data.list.map((group) => ({
        id: group.clubId,
        title: group.name,
        image: group.imageUrl || '/default-group.png',
        description: group.description,
        categoryLabel: CATEGORY_MAP[group.category] || group.category,
        location: group.region,
        levelLabel: LEVEL_MAP[group.level] || group.level,
        participants: {
          current: group.curNumbers,
          max: group.maxNumbers,
          isFull: group.curNumbers >= group.maxNumbers,
        },
        like: {
          count: group.likes,
          isLiked: true, // 좋아요 탭이므로 항상 true
        },
        isRecruiting: group.status === 'RECRUTING',
      })),
    staleTime: 60 * 1000,
  });
};
