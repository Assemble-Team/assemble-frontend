import ky from 'ky';
import { ApiError } from './ApiError';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '/api'; // 브라우저 환경에서는 상대 경로
  // 서버 환경 (Next.js SSR) 에서는 절대 경로 사용
  if (process.env.NEXT_PUBLIC_API_URL)
    return `${process.env.NEXT_PUBLIC_API_URL}/api`;
  return 'http://localhost:3000/api';
};

export const apiClient = ky.create({
  prefixUrl: getBaseUrl(), // 서버와 클라이언트 환경에 맞게 기본 경로 설정
  timeout: 10000, // 10초 타임아웃
  retry: {
    limit: 2, // 에러 시 최대 2번 재시도
    methods: ['get'], // GET 요청만 재시도
  },
  hooks: {
    beforeRequest: [],
    afterResponse: [
      async (request, options, response) => {
        if (!response.ok) {
          try {
            const errorData = await response.json<any>();
            // 백엔드에서 내려주는 에러 명세를 ApiError로 변환
            throw new ApiError(
              errorData.code || 'UNKNOWN_ERROR',
              errorData.message || '알 수 없는 오류가 발생했습니다.'
            );
          } catch (e) {
            if (e instanceof ApiError) throw e;

            // JSON 파싱 실패 혹은 기타 에러 시 기본 에러 처리
            if (response.status === 401) {
              console.error('인증이 만료되었습니다.');
            }
            // throw e를 하지 않으면 ky의 기본 HTTPError가 던져짐
          }
        }
      },
    ],
  },
});
