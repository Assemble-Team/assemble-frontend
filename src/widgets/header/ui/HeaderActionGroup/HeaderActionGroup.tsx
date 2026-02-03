'use client';

import { Search } from 'lucide-react';
import { CreateGroupButton } from './CreateGroupButton';
import { NotificationBell } from './NotificationBell';
import { UserAccountDropdownMenu } from './UserAccountDropdownMenu';

export function HeaderActionGroup() {
  return (
    <div className="flex shrink-0 items-center gap-3 md:gap-5">
      <CreateGroupButton />

      <div className="flex items-center gap-2 md:gap-3">
        <NotificationBell />

        {/* 프로필 이미지와 드롭다운 메뉴 결합 */}
        <UserAccountDropdownMenu />

        {/* 모바일 전용 검색 버튼 */}
        <button className="rounded-2xl p-3 text-gray-500 transition-all hover:bg-gray-50 md:hidden">
          <Search size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
