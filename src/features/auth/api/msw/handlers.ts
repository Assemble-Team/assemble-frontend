import { http, HttpResponse } from 'msw';
import { wrapResponse } from '@/shared/api/mock/utils';

export const authHandlers = [
  // 회원가입 핸들러
  http.post('/api/members/signup', async ({ request }) => {
    const data = (await request.json()) as { email: string };

    // 이메일 중복 시뮬레이션 (abcd@naver.com 일 경우 에러)
    if (data.email === 'abcd@naver.com') {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'MEMBER4003',
          message: '이미 존재하는 이메일입니다.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      wrapResponse({
        id: 1,
        accessToken: 'mock-access-token',
      })
    );
  }),

  // 로그인 핸들러
  http.post('/api/auth/login', async () => {
    return HttpResponse.json(
      wrapResponse({
        id: 1,
        accessToken: 'mock-access-token',
      })
    );
  }),
];
