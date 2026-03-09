import { apiClient } from '@/shared/api/apiClient';

export interface MyCommentDTO {
  commentId: number;
  clubId: number;
  clubName: string;
  postId: number;
  postTitle: string;
  content: string;
  likeCount: number;
  createdAt: string;
}

/**
 * 내가 작성한 댓글 목록을 불러옵니다.
 * GET /users/me/comments
 */
export const getMyComments = async () => {
  return apiClient.get('users/me/comments').json<{ list: MyCommentDTO[] }>();
};
