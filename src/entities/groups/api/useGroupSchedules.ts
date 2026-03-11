'use client';

import { useQuery } from '@tanstack/react-query';
import { getGroupSchedules, type GroupScheduleDTO } from './getGroupSchedules';
import { GroupSchedule } from '../model/types';

export const useGroupSchedules = (groupId: string | number) => {
  return useQuery({
    queryKey: ['groups', groupId, 'schedules'],
    queryFn: () => getGroupSchedules(groupId),
    select: (data): GroupSchedule[] => {
      return data.map((item: GroupScheduleDTO) => ({
        id: item.scheduleId,
        title: item.title,
        content: item.content,
        date: item.date,
        time: item.time,
        location: item.location,
        maxParticipants: item.maxParticipants,
        currentParticipants: item.curParticipants,
        isJoined: item.isJoined,
      }));
    },
  });
};
