import { ApiResponse, ApiListResponse } from '../types';

/**
 * 일반 데이터를 공통 응답 규격(ApiResponse)으로 감싸줍니다.
 */
export const wrapResponse = <T>(result: T): ApiResponse<T> => ({
  isSuccess: true,
  code: 'COMMON200',
  message: '요청이 성공했습니다.',
  result,
  timestamp: new Date().toISOString(),
});

/**
 * 리스트 데이터를 공통 응답 규격 및 페이징 구조(ApiListResponse)로 감싸줍니다.
 */
export const wrapListResponse = <T>(
  list: T[],
  page = 0,
  size = 10,
  totalPages = 1
): ApiResponse<ApiListResponse<T>> => {
  return wrapResponse({
    list,
    page,
    size,
    totalPages,
    totalElements: list.length,
  });
};
