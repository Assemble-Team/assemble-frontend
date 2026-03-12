'use client';

import { useEffect, useState } from 'react';

/**
 * MSW(Mock Service Worker)를 브라우저 환경에서 활성화하기 위한 프로바이더입니다.
 * FSD 구조에 따라 shared/lib/msw에 위치하며, 하이드레이션 에러 방지를 위해 isReady 상태를 관리합니다.
 */
export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return;

    const setup = async () => {
      try {
        // 명시적으로 환경 변수가 'enabled'인 경우에만 MSW 활성화
        if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
          // shared/lib/msw/init에서 초기화 로직을 가져옴
          const { initMsw } = await import('./init');
          // shared/api/mock/handlers에서 통합 핸들러를 가져옴
          const { allHandlers } = await import('@/shared/api/mock/handlers');

          await initMsw(allHandlers);
        }
      } catch (error) {
        console.error('[MSW] Failed to initialize:', error);
      } finally {
        setIsReady(true);
      }
    };

    setup();
  }, [isReady]);

  // MSW 준비 전까지 하이드레이션 에러 방지 및 안전한 모킹 보장
  const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

  if (isMockingEnabled && !isReady) {
    return null;
  }

  return <>{children}</>;
};
