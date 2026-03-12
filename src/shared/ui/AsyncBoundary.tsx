'use client';

import { Suspense, type ReactNode, type ComponentType } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { ApiErrorFallback } from './ApiErrorFallback';

type Props = {
  children: ReactNode;
  loadingFallback: ReactNode;
  errorFallback?: ComponentType<FallbackProps>;
};

/**
 * useSuspenseQuery와 함께 사용하는 선언적 데이터 페칭 바운더리입니다.
 * Suspense와 ErrorBoundary를 결합하여 로딩과 에러 상태를 처리합니다.
 */
export function AsyncBoundary({
  children,
  loadingFallback,
  errorFallback,
}: Props) {
  return (
    <ErrorBoundary FallbackComponent={errorFallback ?? ApiErrorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
