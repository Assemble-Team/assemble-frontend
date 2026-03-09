'use client';

import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getMyProfile, updateMyProfile, UpdateProfileRequest } from './profile';

export const useMyProfile = () => {
  return useSuspenseQuery({
    queryKey: ['user', 'profile'],
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
};
