'use client';

import { PropsWithChildren } from 'react';
import { MSWProvider } from '@/shared/lib/msw/MSWProvider';
import { TanstackQueryProvider } from '@/shared/lib/tanstack-query/TanstackQueryProvider';

/**
 * 어플리케이션의 모든 전역 프로바이더를 통합하는 루트 컴포넌트입니다.
 * 네이버 지도 SDK는 layout.tsx에서 Script 컴포넌트로 로드하므로 여기서 중복 로드하지 않습니다.
 */
export default function Providers({ children }: PropsWithChildren) {
  return (
    <MSWProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </MSWProvider>
  );
}
