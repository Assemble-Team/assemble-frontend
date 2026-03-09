'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getGroupDetail } from './getGroupDetail';
import { GroupDetail } from '../model/types';
import { CATEGORY_MAP, LEVEL_MAP } from '../lib/constants';

export const useGroupDetail = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['groups', id],
    queryFn: () => getGroupDetail(id),
    select: (data): GroupDetail => {
      const group = data.result;
      return {
        id: group.clubId,
        title: group.name,
        image: group.imageUrl || '/default-group.png',
        description: group.description,
        categoryLabel: CATEGORY_MAP[group.category] || group.category,
        levelLabel: LEVEL_MAP[group.level] || group.level,
        location: group.region,
        participants: {
          current: group.curNumbers,
          max: group.maxNumbers,
          isFull: group.curNumbers >= group.maxNumbers,
        },
        like: {
          count: group.likes,
          isLiked: group.liked,
        },
        isRecruiting: group.status === 'RECRUTING',
        myRole: group.myRole || 'GUEST',
        unreadChatCount: group.unreadChatCount,
        nextSchedule: group.nextSchedule,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
