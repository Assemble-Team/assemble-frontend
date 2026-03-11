'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/shared/ui/Button';
import { useMemo, Suspense } from 'react'; // Suspense 추가
import { ButtonProps } from './Button';

interface NavButtonProps extends ButtonProps {
  href: LinkProps['href'];
  exact?: boolean;
  activeParams?: Record<string, string>;
  replace?: boolean;
}

function NavButtonInner({
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
    const targetPathname = typeof href === 'object' ? href.pathname : href;
    if (!targetPathname) return false;

    const isPathMatch = exact
      ? pathname === targetPathname
      : pathname.startsWith(targetPathname);

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

export function NavButton(props: NavButtonProps) {
  return (
    <Suspense fallback={<Button {...props} disabled />}>
      <NavButtonInner {...props} />
    </Suspense>
  );
}
