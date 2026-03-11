/**
 * 백엔드 서버의 공통 응답 규격입니다.
 */
export type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  timestamp: string;
};

/**
 * 리스트 형태의 데이터를 담는 규격입니다. (페이징 포함)
 */
export type ApiListResponse<T> = {
  list: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};

/**
 * 에러 발생 시 서버에서 내려주는 응답 규격입니다.
 */
export type ApiErrorResponse = {
  isSuccess: false;
  code: string;
  message: string;
};
