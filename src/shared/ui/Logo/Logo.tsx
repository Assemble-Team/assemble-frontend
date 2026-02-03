import { ROUTES } from '@/shared/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number;
  href?: string;
}

export default function Logo({ width = 120, href }: LogoProps) {
  // 원본 이미지 비율이 1324:576 (약 2.3:1) 이라고 가정했을 때의 높이 계산
  const aspectRatio = 576 / 1324;
  const calculatedHeight = width * aspectRatio;

  const logo = (
    <Image
      src="/images/assemble-logo.png"
      alt="assemble logo"
      // size에 맞춰 서버에서 최적화된 이미지를 가져옵니다.
      width={width}
      height={calculatedHeight}
      priority
      unoptimized
      style={{ width: `${width}px`, height: 'auto' }}
      className="dark:brightness-200 dark:invert"
    />
  );

  if (href) {
    return (
      <Link href={ROUTES.HOME} className="inline-block shrink-0">
        {logo}
      </Link>
    );
  }

  return <div className="inline-block shrink-0">{logo}</div>;
}
