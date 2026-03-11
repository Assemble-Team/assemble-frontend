'use client';

import { getQueryClient } from './getQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/**
 * TanStack Query(React Query) 프로바이더입니다.
 * FSD 구조에 따라 shared/lib/tanstack-query에 위치하며, getQueryClient를 통해 클라이언트를 생성합니다.
 */
export const TanstackQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
