import { HTTPError } from 'ky';
import { CreateGroupFormValues } from '../model/schema';
import { ApiErrorResponse, ApiResponse } from '@/shared/api/types';
import { apiClient } from '@/shared/api/apiClient';
import { ApiError } from '@/shared/api/ApiError';

interface CreateClubResult {
  clubId: number;
}

export const createGroup = async (
  data: CreateGroupFormValues
): Promise<ApiResponse<CreateClubResult>> => {
  try {
    const res = await apiClient
      .post('groups', { json: data })
      .json<ApiResponse<CreateClubResult>>();

    return res;
  } catch (e) {
    if (e instanceof HTTPError) {
      const errorBody = (await e.response.json()) as ApiErrorResponse;
      throw new ApiError(errorBody.code, errorBody.message);
    }
    throw e;
  }
};
