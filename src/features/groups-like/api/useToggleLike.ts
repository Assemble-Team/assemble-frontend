'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '@/entities/groups/api/toggleLike';
import { Group, JoinedGroup } from '@/entities/groups/model/types';

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: number) => toggleLike(groupId),
    onMutate: async (groupId) => {
      // 1. 발송 전 관련 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['groups'] });

      // 2. 이전 상태 저장 (롤백용)
      const previousLikedGroups = queryClient.getQueryData(['groups', 'liked']);

      // 3. 낙관적 업데이트 (좋아요한 모임 리스트에서 제거 등)
      queryClient.setQueriesData({ queryKey: ['groups'] }, (old: any) => {
        if (!old) return old;

        // 리스트 데이터 구조 (Group[] 또는 JoinedGroup[])인 경우
        if (Array.isArray(old)) {
          return old.map((group: Group | JoinedGroup) =>
            group.id === groupId
              ? {
                  ...group,
                  like: {
                    ...group.like,
                    isLiked: !group.like.isLiked,
                    count: group.like.isLiked
                      ? group.like.count - 1
                      : group.like.count + 1,
                  },
                }
              : group
          );
        }

        // list 속성을 가진 객체인 경우 (getLikedGroups 등)
        if (old.list && Array.isArray(old.list)) {
          // 좋아요를 해제하는 경우 리스트에서 즉시 제거 (좋아요 탭 전용)
          // 하지만 일반적인 토글을 위해 상태만 변경
          return {
            ...old,
            list: old.list.map((group: any) =>
              (group.clubId || group.id) === groupId
                ? {
                    ...group,
                    liked: !group.liked,
                    likes: group.liked ? group.likes - 1 : group.likes + 1,
                  }
                : group
            ),
          };
        }

        return old;
      });

      return { previousLikedGroups };
    },
    onError: (err, groupId, context) => {
      // 에러 시 이전 상태로 복구
      if (context?.previousLikedGroups) {
        queryClient.setQueryData(
          ['groups', 'liked'],
          context.previousLikedGroups
        );
      }
    },
    onSettled: () => {
      // 성공/실패 여부와 상관없이 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};
