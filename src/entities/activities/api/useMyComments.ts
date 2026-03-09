'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyComments } from './getMyComments';
import { MyComment } from '../model/types';

export const useMyComments = () => {
  return useSuspenseQuery({
    queryKey: ['activities', 'comments'],
    queryFn: getMyComments,
    select: (data): MyComment[] =>
      data.list.map((c) => ({
        id: c.commentId,
        groupId: c.clubId,
        groupName: c.clubName,
        postId: c.postId,
        postTitle: c.postTitle,
        content: c.content,
        likeCount: c.likeCount,
        createdAt: c.createdAt,
      })),
    staleTime: 60 * 1000,
  });
};
