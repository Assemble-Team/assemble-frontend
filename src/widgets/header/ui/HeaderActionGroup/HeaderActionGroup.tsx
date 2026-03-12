'use client';

import { Search } from 'lucide-react';
import { CreateGroupButton } from './CreateGroupButton';
import { NotificationBell } from './NotificationBell';
import { NotificationPopover } from './NotificationPopover';
import { UserAccountDropdownMenu } from './UserAccountDropdownMenu';
import { NavButton } from '@/shared/ui/Button';
import { ROUTES } from '@/shared/constants/routes';
import { useUserStore } from '@/entities/user';

interface HeaderActionGroupProps {
  onSearchClick?: () => void;
}

/**
 * HeaderActionGroup
 * 헤더 우측의 액션 버튼 그룹 (검색, 생성, 알림, 유저 메뉴)을 관리합니다.
 */
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
            {/* Compound Component 패턴을 통한 알림 벨과 팝업의 조합 */}
            <NotificationPopover>
              <NotificationPopover.Trigger>
                <NotificationBell />
              </NotificationPopover.Trigger>
              <NotificationPopover.Content />
            </NotificationPopover>

            <UserAccountDropdownMenu />
          </>
        ) : (
          <NavButton href={ROUTES.AUTH.LOGIN}>로그인</NavButton>
        )}
      </div>
    </div>
  );
}
