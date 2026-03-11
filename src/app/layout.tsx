import type { Metadata } from 'next';
import '@/shared/styles/globals.css';
import { Header } from '@/widgets/header';
import { pretendard } from '@/shared/lib/fonts';
import Providers from './providers';
import Script from 'next/script';

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
      <head>
        {/* 네이버 지도 SDK (정확한 oapi 주소 사용) */}
        <Script
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Providers>
          <Header />

          {children}

          {modal}
        </Providers>
      </body>
    </html>
  );
}
