import { apiClient } from '@/shared/api/apiClient';

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

/**
 * 특정 모임의 일정 목록을 불러옵니다.
 * 이 API는 현재 단순 배열을 반환하는 것으로 명세되어 있습니다. (result 필드 내 배열)
 */
export const getGroupSchedules = async (
  groupId: string | number
): Promise<GroupScheduleDTO[]> => {
  return apiClient.get(`groups/${groupId}/schedules`).json<GroupScheduleDTO[]>();
};
