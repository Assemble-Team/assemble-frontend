import { http, HttpResponse } from 'msw';
import { wrapResponse } from '@/shared/api/mock/utils';

export const authHandlers = [
  /**
   * 이메일 인증 요청
   * POST /api/members/email
   */
  http.post('/api/members/email', async ({ request }) => {
    const { email } = (await request.json()) as { email: string };

    if (email === 'duplicate@test.com') {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'MEMBER4002',
          message: '이미 존재하는 이메일입니다.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(wrapResponse(null));
  }),

  /**
   * 이메일 인증번호 확인
   * POST /api/members/email/check
   */
  http.post('/api/members/email/check', async ({ request }) => {
    const { code } = (await request.json()) as { email: string; code: string };

    if (code !== '123456') {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'MEMBER4001',
          message: '잘못된 인증번호입니다.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(wrapResponse(null));
  }),

  /**
   * 회원가입
   * POST /api/members/signup
   */
  http.post('/api/members/signup', async ({ request }) => {
    const data = (await request.json()) as { email: string };

    if (data.email === 'duplicate@test.com') {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'MEMBER4002',
          message: '이미 가입된 이메일입니다.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      wrapResponse({
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString(),
      })
    );
  }),

  /**
   * 로그인 핸들러
   * POST /api/auth/login
   */
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as any;

    // 1. 존재하지 않는 이메일 (MEMBER4004)
    if (email === 'nonexistent@test.com') {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'MEMBER4004',
          message: '존재하지 않는 이메일 주소입니다',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // 2. 일치하지 않는 비밀번호 (MEMBER4005)
    if (password !== 'password123') {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'MEMBER4005',
          message: '일치하지 않는 비밀번호입니다',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // 3. 성공 (COMMON200)
    return HttpResponse.json(
      wrapResponse({
        memberId: 1,
        refreshToken: 'mock-refresh-token-xxxxx',
        createdAt: new Date().toISOString(),
      }),
      {
        headers: {
          Authorization: 'Bearer mock-access-token-yyyyy',
        },
      }
    );
  }),

  /**
   * 토큰 재발급 핸들러
   * POST /api/auth/reissue
   */
  http.post('/api/auth/reissue', async ({ request }) => {
    const { refreshToken } = (await request.json()) as { refreshToken: string };

    // 1. 유효하지 않은 리프레시 토큰 (MEMBER4007)
    if (refreshToken !== 'mock-refresh-token-xxxxx') {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'MEMBER4007',
          message: '존재하지 않는 리프레시 토큰입니다',
          timestamp: new Date().toISOString(),
        },
        { status: 401 } // Unauthorized
      );
    }
    
    // 2. 성공 (COMMON200)
    return HttpResponse.json(
      wrapResponse({}), // result는 비어있음
      {
        headers: {
          Authorization: 'Bearer new-mock-access-token-zzzzz',
        },
      }
    );
  }),
  
  /**
   * 로그아웃 핸들러
   * POST /api/auth/logout
   */
  http.post('/api/auth/logout', async () => {
    return HttpResponse.json(wrapResponse(null));
  }),

  /**
   * 회원 탈퇴 핸들러
   * DELETE /api/auth/me
   */
  http.delete('/api/auth/me', async () => {
    // 실제로는 인증된 유저인지 확인하는 로직이 필요
    return HttpResponse.json(wrapResponse(null));
  }),
];
