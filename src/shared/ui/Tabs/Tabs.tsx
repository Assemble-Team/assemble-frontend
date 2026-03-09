'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { motion } from 'framer-motion';

interface TabItem {
  label: string;
  href: string;
  exact?: boolean;
  value?: string; // 쿼리 파라미터와 비교할 값
}

interface TabsProps {
  items: TabItem[];
  className?: string;
  searchParamKey?: string; // 쿼리 파라미터 기반으로 동작할 때 사용할 키 (예: 'category')
}

export function Tabs({ items, className, searchParamKey }: TabsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParamValue = searchParamKey
    ? searchParams.get(searchParamKey)
    : null;

  return (
    <div className={cn('relative flex border-b border-slate-100', className)}>
      {items.map((item) => {
        let isActive = false;

        if (searchParamKey) {
          // 쿼리 파라미터 기반 활성화 체크
          const targetValue = item.value || '';
          isActive =
            currentParamValue === targetValue ||
            (!currentParamValue && targetValue === 'all');
        } else {
          // 기존 경로 기반 활성화 체크
          isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            className={cn(
              'relative px-6 py-4 text-sm font-bold transition-colors',
              isActive
                ? 'text-brand-500'
                : 'text-slate-400 hover:text-slate-600'
            )}
          >
            {item.label}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="bg-brand-500 absolute bottom-0 left-0 h-1 w-full rounded-t-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
