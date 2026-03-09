'use client';

import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getNotificationSettings,
  updateNotificationSettings,
} from './notifications';
import { NotificationSettings } from '../model/types';

export const useNotificationSettings = () => {
  return useSuspenseQuery({
    queryKey: ['user', 'settings', 'notifications'],
    queryFn: getNotificationSettings,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<NotificationSettings>) =>
      updateNotificationSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'settings', 'notifications'],
      });
    },
  });
};
