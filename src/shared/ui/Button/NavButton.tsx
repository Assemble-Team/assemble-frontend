'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/shared/ui/Button';
import { useMemo } from 'react';
import { ButtonProps } from './Button';

interface NavButtonProps extends ButtonProps {
  href: LinkProps['href'];
  /**
   * exact가 true이면 현재 pathname이 href와 "완전히 동일할 때만" 활성화됩니다.
   *
   * - exact = true
   *   pathname === href 인 경우에만 active
   *   예) href="/groups"
   *       "/groups"      → 활성화
   *       "/groups/new"  → 비활성화
   *
   * - exact = false (기본값)
   *   pathname이 href로 시작하면 활성화됩니다.
   *   예) href="/groups"
   *       "/groups"      → 활성화
   *       "/groups/new"  → 활성화
   *
   * 주로:
   * - 상위 메뉴(/groups) → exact=false
   * - 하위 메뉴(/groups/new) → exact=true
   * 로 사용합니다.
   */
  exact?: boolean;
  /**
   * 특정 searchParams가 일치해야 활성화하고 싶을 때 사용합니다.
   * 예) { category: 'sports' }
   */
  activeParams?: Record<string, string>;
  replace?: boolean;
}

export default function NavButton({
  href,
  exact = false,
  activeParams,
  variant = 'secondary',
  replace = false,
  ...props
}: NavButtonProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = useMemo(() => {
    // 1. href에서 pathname 추출 (문자열일 수도, 객체일 수도 있음)
    const targetPathname = typeof href === 'object' ? href.pathname : href;

    if (!targetPathname) return false;

    // 2. 기본 경로 일치 여부 확인
    const isPathMatch = exact
      ? pathname === targetPathname
      : pathname.startsWith(targetPathname);

    // 3. activeParams 조건 확인
    if (!activeParams) return isPathMatch;

    const isParamsMatch = Object.entries(activeParams).every(
      ([key, value]) => searchParams.get(key) === value
    );

    return isPathMatch && isParamsMatch;
  }, [pathname, href, exact, activeParams, searchParams]);

  return (
    <Button asChild data-active={isActive} {...props} variant={variant}>
      <Link href={href} replace={replace} scroll={false}>
        {props.children}
      </Link>
    </Button>
  );
}
