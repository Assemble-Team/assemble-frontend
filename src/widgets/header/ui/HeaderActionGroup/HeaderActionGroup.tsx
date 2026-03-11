'use client';

import { CreateGroupButton } from './CreateGroupButton';
import { NotificationBell } from './NotificationBell';
import { UserAccountDropdownMenu } from './UserAccountDropdownMenu';
import { NavButton } from '@/shared/ui/Button';
import { ROUTES } from '@/shared/constants/routes';
import { useUserStore } from '@/entities/user';
import { Search } from 'lucide-react';

interface HeaderActionGroupProps {
  onSearchClick?: () => void;
}

export function HeaderActionGroup({ onSearchClick }: HeaderActionGroupProps) {
  const { isAuthenticated } = useUserStore();

  return (
    <div className="flex shrink-0 items-center gap-3 md:gap-5">
      <CreateGroupButton />

      <div className="flex items-center gap-2 md:gap-3">
        {/* 모바일 검색 트리거 버튼 */}
        <button
          onClick={onSearchClick}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
        >
          <Search size={20} />
        </button>

        {isAuthenticated ? (
          <>
            <NotificationBell />
            <UserAccountDropdownMenu />
          </>
        ) : (
          <NavButton href={ROUTES.AUTH.LOGIN}>로그인</NavButton>
        )}
      </div>
    </div>
  );
}
