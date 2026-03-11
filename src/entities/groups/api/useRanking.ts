'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getHallOfFameRanking, getWeeklyRanking } from './getRanking';
import { groupKeys } from '../model/group.queries';

export const useRanking = (type: 'hall-of-fame' | 'weekly') => {
  return useSuspenseQuery({
    queryKey: [...groupKeys.ranking(), type],
    queryFn: type === 'hall-of-fame' ? getHallOfFameRanking : getWeeklyRanking,
    select: (data) => data.list,
    staleTime: 5 * 60 * 1000, // 5분 캐시
  });
};
