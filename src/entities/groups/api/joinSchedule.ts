import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/api/types';

export const joinSchedule = async (
  groupId: string | number,
  scheduleId: string | number
): Promise<ApiResponse<null>> => {
  return apiClient
    .post(`groups/${groupId}/schedules/${scheduleId}/join`)
    .json<ApiResponse<null>>();
};
