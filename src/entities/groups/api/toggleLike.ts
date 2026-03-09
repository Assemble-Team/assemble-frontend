import { apiClient } from '@/shared/api/apiClient';

export interface ToggleLikeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    clubId: number;
    liked: boolean;
    likes: number;
  };
}

export const toggleLike = async (id: number): Promise<ToggleLikeResponse> => {
  return apiClient.post(`groups/${id}/like`).json<ToggleLikeResponse>();
};
