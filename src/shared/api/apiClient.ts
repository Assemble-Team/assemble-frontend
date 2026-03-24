import ky, { type BeforeErrorHook, type BeforeRequestHook } from 'ky';
import { useAuthStore } from '@/shared/model/auth/store';
import { ApiResponse } from './types';

const beforeRequest: BeforeRequestHook = async (request) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
};

const handleApiResponse = async (
  _request: Request,
  _options: unknown,
  response: Response
) => {
  if (!response.ok) return response;

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const clonedResponse = response.clone();
    const body = (await clonedResponse.json()) as ApiResponse<unknown>;

    if (body.isSuccess === false) {
      throw new Error(body.message || '요청 처리에 실패했습니다.');
    }

    const newResponse = new Response(JSON.stringify(body.result ?? {}), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    
    // Authorization 헤더가 있다면 복사
    if (response.headers.has('Authorization')) {
      newResponse.headers.set('Authorization', response.headers.get('Authorization')!);
    }
    
    return newResponse;
  }

  return response;
};

const afterResponseRetry: BeforeRequestHook = async (
  request,
  _options,
  response
) => {
  if (response.status !== 401) return response;

  const { refreshToken, setAccessToken, clearTokens } = useAuthStore.getState();

  if (!refreshToken) {
    clearTokens();
    if (typeof window !== 'undefined') window.location.href = '/login';
    return response;
  }

  try {
    const reissueResponse = await ky.post('/api/auth/reissue', {
      prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      json: { refreshToken },
    });

    const newAccessToken = reissueResponse.headers.get('Authorization')?.replace('Bearer ', '');

    if (newAccessToken) {
      setAccessToken(newAccessToken);
      request.headers.set('Authorization', `Bearer ${newAccessToken}`);
      return ky(request);
    }
  } catch (error) {
    clearTokens();
    if (typeof window !== 'undefined') window.location.href = '/login';
  }

  return response;
};


const beforeError: BeforeErrorHook = async (error) => {
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
  credentials: 'include',
  hooks: {
    beforeRequest: [beforeRequest],
    afterResponse: [handleApiResponse, afterResponseRetry],
    beforeError: [beforeError],
  },
});
