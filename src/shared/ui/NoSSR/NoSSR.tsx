'use client';

import { ReactNode, useEffect, useState } from 'react';

interface NoSSRProps {
  children: ReactNode;
}

/**
 * 서버 사이드 렌더링(SSR)을 방지하고 클라이언트 마운트 후에만 자식을 렌더링하는 래퍼 컴포넌트입니다.
 * 하이드레이션 에러(Hydration Mismatch)를 방지할 때 사용합니다.
 */
export function NoSSR({ children }: NoSSRProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 그냥 true로 바꾸는 대신, 브라우저가 준비될 때까지 한 프레임 쉽니다.
    const raf = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  // 마운트되기 전(서버 렌더링 포함)에는 아무것도 렌더링하지 않음
  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}
