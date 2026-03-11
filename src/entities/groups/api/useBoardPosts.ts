import { useQuery } from '@tanstack/react-query';
import { getBoardPosts } from './getBoardPosts';
import { GroupPost } from '../model/types';

export const useBoardPosts = (groupId: string | number) => {
  return useQuery({
    queryKey: ['groups', groupId, 'posts'],
    queryFn: () => getBoardPosts(groupId),
    select: (data) =>
      data.list.map(
        (post) =>
          ({
            id: post.postId,
            title: post.title,
            content: post.content,
            authorName: post.authorName,
            authorImageUrl: post.authorImageUrl,
            createdAt: post.createdAt,
            commentCount: post.commentCount,
            likeCount: post.likeCount,
          }) as GroupPost
      ),
  });
};
