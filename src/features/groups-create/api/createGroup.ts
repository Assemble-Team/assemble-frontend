import { HTTPError } from 'ky';
import { CreateGroupFormValues } from '../model/schema';
import { ApiErrorResponse } from '@/shared/api/types';
import { apiClient } from '@/shared/api/apiClient';
import { ApiError } from '@/shared/api/ApiError';

interface CreateClubResult {
  clubId: number;
}

/**
 * 새로운 모임을 생성합니다.
 * apiClient에서 result 필드를 자동으로 추출하므로 CreateClubResult를 반환합니다.
 */
export const createGroup = async (
  data: CreateGroupFormValues
): Promise<CreateClubResult> => {
  try {
    return await apiClient
      .post('groups', { json: data })
      .json<CreateClubResult>();
  } catch (e) {
    if (e instanceof HTTPError) {
      const errorBody = (await e.response.json()) as ApiErrorResponse;
      throw new ApiError(errorBody.code, errorBody.message);
    }
    throw e;
  }
};
