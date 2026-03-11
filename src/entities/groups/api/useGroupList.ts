'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getGroupList, type GroupListItemDTO } from './getGroupList';
import { Group } from '../model/types';
import { groupKeys } from '../model/group.queries';
import { CATEGORY_MAP, LEVEL_MAP, STATUS_MAP } from '../lib/constants';

/**
 * [Mapper] DTO -> Frontend Model 변환 함수
 */
const mapGroupListItemToModel = (dto: GroupListItemDTO): Group => ({
  id: dto.clubId,
  title: dto.name,
  image: dto.imageUrl || '/default-group.png',
  description: dto.description,
  categoryLabel: CATEGORY_MAP[dto.category] || dto.category,
  location: dto.region,
  levelLabel: LEVEL_MAP[dto.level] || dto.level,
  statusLabel: STATUS_MAP[dto.status] || dto.status,
  participants: {
    current: dto.curNumbers,
    max: dto.maxNumbers,
    isFull: dto.curNumbers >= dto.maxNumbers,
  },
  like: {
    count: dto.likes,
    isLiked: dto.liked,
  },
  isRecruiting: dto.status === 'RECRUTING',
});

export const useGroupList = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return useSuspenseQuery({
    queryKey: groupKeys.list(params),
    queryFn: () => getGroupList(params),
    select: (data): Group[] => {
      // API 응답 구조(ApiResponse.result.list)에 맞춰 매핑 수행
      return data.list.map(mapGroupListItemToModel);
    },
    staleTime: 60 * 1000,
  });
};
