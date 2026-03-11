import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/api/types';
import { GroupPost } from '../model/types';

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
): Promise<ApiResponse<BoardPostDTO[]>> => {
  return apiClient
    .get(`groups/${groupId}/posts`)
    .json<ApiResponse<BoardPostDTO[]>>();
};
