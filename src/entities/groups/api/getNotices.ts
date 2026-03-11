import { apiClient } from '@/shared/api/apiClient';
import { ApiListResponse } from '@/shared/api/types';

export interface NoticeDTO {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isFixed: boolean;
  authorName: string;
}

export const getGroupNotices = async (groupId: string): Promise<ApiListResponse<NoticeDTO>> => {
  return apiClient
    .get(`groups/${groupId}/notices`)
    .json<ApiListResponse<NoticeDTO>>();
};
