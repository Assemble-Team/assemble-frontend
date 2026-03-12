export async function register() {
  // 서버 사이드(Node.js) 런타임인지 확인
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 개발 환경에서만 MSW 활성화 (배포 환경에서는 비활성화)
    if (process.env.NODE_ENV === 'development') {
      const { initMsw } = await import('@/shared/lib/msw/init');
      const { allHandlers } = await import('@/shared/api/mock/handlers');

      await initMsw(allHandlers);

      console.log('🚀 [Instrumentation] Server-side MSW Initialized');
    }
  }
}

