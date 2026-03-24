import { http, HttpResponse } from 'msw';
import { wrapResponse } from '@/shared/api/mock/utils';

export const authHandlers = [
  /**
   * 3.1 이메일 인증 요청
   * POST /api/members/email
   */
  http.post('/api/members/email', async ({ request }) => {
    const { email } = (await request.json()) as { email: string };

    // 특정 이메일 입력 시 에러 시뮬레이션 (이미 가입된 경우)
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

    // 성공 응답 (COMMON200)
    return HttpResponse.json(wrapResponse(null));
  }),

  /**
   * 3.2 이메일 인증번호 확인
   * POST /api/members/email/check
   */
  http.post('/api/members/email/check', async ({ request }) => {
    const { code } = (await request.json()) as { email: string; code: string };

    // 테스트용 인증번호 '123456'만 통과
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

    // 성공 응답
    return HttpResponse.json(wrapResponse(null));
  }),

  /**
   * 3.3 회원가입
   * POST /api/members/signup
   */
  http.post('/api/members/signup', async ({ request }) => {
    const data = (await request.json()) as { email: string };

    // 중복 이메일 체크 (이메일 인증 단계에서 걸러지겠지만, 한 번 더 방어)
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

    // spec.md 정의에 맞춘 응답 (id, createdAt)
    return HttpResponse.json(
      wrapResponse({
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString(),
      })
    );
  }),

  // 기존 로그인 핸들러 (유지)
  http.post('/api/auth/login', async () => {
    return HttpResponse.json(
      wrapResponse({
        id: 1,
        accessToken: 'mock-access-token',
      })
    );
  }),
];
