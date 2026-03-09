import type { Metadata } from 'next';
import '@/shared/styles/globals.css';
import { Header } from '@/widgets/header';
import { pretendard } from '@/shared/lib/fonts';
import Providers from './_providers/Providers';

import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Assemble | 지역 기반 모임 플랫폼',
  description: '지역 기반 모임 플랫폼',

  appleWebApp: {
    title: 'Assemble',
    capable: true,
    statusBarStyle: 'default',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <Providers>
          <Suspense fallback={null}>
            <Header />
          </Suspense>

          {children}

          {modal}
        </Providers>
      </body>
    </html>
  );
}
