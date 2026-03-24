import ky, { type BeforeErrorHook, type BeforeRequestHook } from 'ky';
import { useAuthStore } from '@/shared/model/auth/store';
import { ApiResponse } from './types';

const beforeRequest: BeforeRequestHook = async (request) => {
  // Zustand 메모리에서 access_token 꺼내서 헤더 주입
  const token = useAuthStore.getState().accessToken;
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
};

/**
 * 백엔드 공통 응답 규격(ApiResponse)을 처리하는 훅입니다.
 * 성공 시 result 필드만 추출하여 반환합니다.
 */
const handleApiResponse = async (
  _request: Request,
  _options: unknown,
  response: Response
) => {
  if (!response.ok) return response;

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    // response.clone()을 사용하여 원본 응답 보존
    const clonedResponse = response.clone();
    const body = (await clonedResponse.json()) as ApiResponse<unknown>;

    // 백엔드 규격상 성공이지만 비즈니스 로직 에러인 경우
    if (body.isSuccess === false) {
      throw new Error(body.message || '요청 처리에 실패했습니다.');
    }

    // result 필드만 담은 새로운 응답 객체 생성하여 반환 (result가 없으면 빈 객체 반환)
    // 원본 응답의 메타데이터(상태코드, 헤더 등)를 최대한 보존
    return new Response(JSON.stringify(body.result ?? {}), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  return response;
};

const afterResponseRetry = async (
  request: Request,
  _options: unknown,
  response: Response
) => {
  if (response.status !== 401) return response;

  // access_token 만료 -> /api/auth/refresh 로 재발급 (Next.js Route Handler 호출)
  try {
    const result = await ky
      .post('/api/auth/refresh')
      .json<{ accessToken: string }>();

    if (result.accessToken) {
      // 새 토큰 저장 후 원래 요청 재시도
      useAuthStore.getState().setToken(result.accessToken);
      request.headers.set('Authorization', `Bearer ${result.accessToken}`);
      return ky(request);
    }
  } catch (error) {
    // refresh_token도 만료 -> 로그인 페이지로 리다이렉트
    useAuthStore.getState().clearToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  return response;
};

const beforeError: BeforeErrorHook = async (error) => {
  // 네트워크 에러 (백엔드 서버 미배포 또는 오프라인) 처리
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    (error as Error).message =
      '백엔드 서버에 연결할 수 없습니다. 서버가 아직 배포되지 않았거나 점검 중일 수 있습니다.';
    return error;
  }

  try {
    const body = (await error.response
      .json()
      .catch(() => ({}))) as { message?: string };
    (error as Error).message =
      body.message ?? '알 수 없는 오류가 발생했습니다.';
  } catch (e) {
    (error as Error).message = '응답을 처리하는 중 오류가 발생했습니다.';
  }
  return error;
};

export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  credentials: 'include', // refresh_token 쿠키를 함께 전송
  hooks: {
    beforeRequest: [beforeRequest],
    afterResponse: [handleApiResponse, afterResponseRetry],
    beforeError: [beforeError],
  },
});
