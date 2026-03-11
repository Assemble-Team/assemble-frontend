import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/api/types';
import { CreatePostRequest } from '../model/types';

export interface CreatePostResponse {
  postId: number;
}

export const createBoardPost = async (
  groupId: string | number,
  data: CreatePostRequest
): Promise<ApiResponse<CreatePostResponse>> => {
  return apiClient
    .post(`groups/${groupId}/posts`, { json: data })
    .json<ApiResponse<CreatePostResponse>>();
};
