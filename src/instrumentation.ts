export async function register() {
  // 1. 서버 사이드(Node.js) 런타임인지 확인
  // 2. 개발 환경인지 확인
  if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NODE_ENV === 'development'
  ) {
    const { initMsw } = await import('@/shared/lib/msw/init');
    const { allHandlers } = await import('@/shared/api/mock/handlers');

    await initMsw(allHandlers);

    console.log('🚀 [Instrumentation] Server-side MSW Initialized');
  }
}
