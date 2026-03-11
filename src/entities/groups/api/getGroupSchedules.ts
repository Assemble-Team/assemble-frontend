import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/api/types';

export interface GroupScheduleDTO {
  scheduleId: number;
  title: string;
  content: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  curParticipants: number;
  isJoined: boolean;
}

export const getGroupSchedules = async (
  groupId: string | number
): Promise<ApiResponse<GroupScheduleDTO[]>> => {
  return apiClient
    .get(`groups/${groupId}/schedules`)
    .json<ApiResponse<GroupScheduleDTO[]>>();
};
