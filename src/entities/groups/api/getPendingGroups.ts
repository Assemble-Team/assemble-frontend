import { apiClient } from '@/shared/api/apiClient';
import { GroupListItemDTO } from './getGroupList';

/**
 * 내가 가입 신청 후 승인 대기 중인 모임 목록을 불러옵니다.
 * GET /groups/pending
 */
export const getPendingGroups = async () => {
  return apiClient.get('groups/pending').json<{ list: GroupListItemDTO[] }>();
};
