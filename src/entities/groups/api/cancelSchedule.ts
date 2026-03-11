import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/api/types';

export const cancelSchedule = async (
  groupId: string | number,
  scheduleId: string | number
): Promise<ApiResponse<null>> => {
  return apiClient
    .delete(`groups/${groupId}/schedules/${scheduleId}`)
    .json<ApiResponse<null>>();
};
