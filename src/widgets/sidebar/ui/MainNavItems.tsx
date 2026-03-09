'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { NavButton } from '@/shared/ui/Button';
import { SIDEBAR_MENU_ITEMS } from '../constants';

interface MainNavItemsProps {
  collapsed?: boolean;
  onItemClick?: () => void;
}

export const MainNavItems = ({
  collapsed = false,
  onItemClick,
}: MainNavItemsProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {SIDEBAR_MENU_ITEMS.map((item) => (
        <NavButton
          key={item.href}
          href={item.href}
          exact={item.exact}
          variant="ghost"
          onClick={onItemClick}
          className={cn(
            'group relative flex items-center rounded-2xl font-black transition-all',
            collapsed ? 'w-13 justify-center gap-0 p-3' : 'justify-start px-5'
          )}
        >
          <div className="flex shrink-0 items-center justify-center">
            <item.icon className="size-7 stroke-[2.5px]" />
          </div>

          <span
            className={cn(
              'truncate transition-all duration-300',
              collapsed
                ? 'ml-0 w-0 opacity-0'
                : 'ml-4 w-auto text-lg opacity-100'
            )}
          >
            {item.label}
          </span>

          <div className="bg-brand-500 absolute top-3 bottom-3 left-0 w-1.5 rounded-r-full opacity-0 transition-opacity group-data-[active=true]:opacity-100" />
        </NavButton>
      ))}
    </nav>
  );
};
