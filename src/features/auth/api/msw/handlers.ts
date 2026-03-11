import { http, HttpResponse } from 'msw';

export const authHandlers = [
  // 회원가입 핸들러
  http.post('/api/members/signup', async ({ request }) => {
    const data = (await request.json()) as any;

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

    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON200',
      message: '요청이 성공했습니다.',
      result: {
        id: 1,
        accessToken: 'mock-access-token',
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 로그인 핸들러
  http.post('/api/members/login', async () => {
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON200',
      message: '요청이 성공했습니다.',
      result: {
        id: 1,
        accessToken: 'mock-access-token',
      },
      timestamp: new Date().toISOString(),
    });
  }),
];
