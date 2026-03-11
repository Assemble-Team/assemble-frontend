import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/api/types';

export interface GroupDetailDTO {
  clubId: number;
  name: string;
  imageUrl: string | null;
  description: string;
  category: 'EXERCISE' | 'STUDY' | 'PROJECT' | 'HOBBY' | 'CULTURE_ART';
  level: 'LOW' | 'MID' | 'HIGH';
  region: string;
  status: 'RECRUTING' | 'CLOSED';
  curNumbers: number;
  maxNumbers: number;
  likes: number;
  liked: boolean;
  myRole?: 'LEADING' | 'MEMBER' | 'GUEST';
  isPending?: boolean;
  unreadChatCount?: number;
  nextSchedule?: {
    title: string;
    date: string;
  } | null;
}

export const getGroupDetail = async (
  id: string | number
): Promise<ApiResponse<GroupDetailDTO>> => {
  return apiClient.get(`groups/${id}`).json<ApiResponse<GroupDetailDTO>>();
};
