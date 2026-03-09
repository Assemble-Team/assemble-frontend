'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { NAV_ITEMS } from '../constants';
import { NavButton } from '@/shared/ui/Button';

interface MyPageNavItemsProps {
  collapsed?: boolean;
  onItemClick?: () => void;
}

export const MyPageNavItems = ({
  collapsed = false,
  onItemClick,
}: MyPageNavItemsProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {NAV_ITEMS.map((group) => {
        const isActive = group.exact
          ? pathname === group.href
          : pathname.startsWith(group.href.split('/').slice(0, 3).join('/'));

        return (
          <NavButton
            key={group.label}
            href={group.href}
            variant="ghost"
            data-active={isActive}
            onClick={onItemClick}
            className={cn(
              'group relative flex items-center rounded-2xl font-black transition-all',
              collapsed ? 'w-13 justify-center gap-0 p-3' : 'justify-start px-5'
            )}
          >
            <div className="flex shrink-0 items-center justify-center">
              <group.icon className="size-7 stroke-[2.5px]" />
            </div>

            <span
              className={cn(
                'truncate transition-all duration-300',
                collapsed
                  ? 'ml-0 w-0 opacity-0'
                  : 'ml-4 w-auto text-lg opacity-100'
              )}
            >
              {group.label}
            </span>

            <div className="bg-brand-500 absolute top-3 bottom-3 left-0 w-1.5 rounded-r-full opacity-0 transition-opacity group-data-[active=true]:opacity-100" />
          </NavButton>
        );
      })}
    </nav>
  );
};
