'use client';

import { Button } from '@/shared/ui/Button';
import { Bell } from 'lucide-react';

export function NotificationBell() {
  // 나중에 여기서 알림 데이터를 가져오는 로직(React Query 등)을 넣습니다.
  const notificationCount = 2;

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" aria-label="알림 확인">
        <Bell size={22} />
        {notificationCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[8px] font-black text-white">
            {notificationCount}
          </span>
        )}
      </Button>
    </div>
  );
}
