import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/api/types';
import { CreateScheduleRequest } from '../model/types';

export interface CreateScheduleResponse {
  scheduleId: number;
}

export const createGroupSchedule = async (
  groupId: string | number,
  data: CreateScheduleRequest
): Promise<ApiResponse<CreateScheduleResponse>> => {
  return apiClient
    .post(`groups/${groupId}/schedules`, { json: data })
    .json<ApiResponse<CreateScheduleResponse>>();
};
