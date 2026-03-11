import { apiClient } from '@/shared/api/apiClient';
import { ApiListResponse } from '@/shared/api/types';

export interface BoardPostDTO {
  postId: number;
  title: string;
  content: string;
  authorName: string;
  authorImageUrl?: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
}

export const getBoardPosts = async (
  groupId: string | number
): Promise<ApiListResponse<BoardPostDTO>> => {
  return apiClient.get(`groups/${groupId}/posts`).json<ApiListResponse<BoardPostDTO>>();
};
