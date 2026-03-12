export async function register() {
  // 서버 사이드(Node.js) 런타임인지 확인
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 명시적으로 환경 변수가 'enabled'인 경우에만 MSW 활성화
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      const { initMsw } = await import('@/shared/lib/msw/init');
      const { allHandlers } = await import('@/shared/api/mock/handlers');

      await initMsw(allHandlers);

      console.log('🚀 [Instrumentation] Server-side MSW Initialized');
    }
  }
}

