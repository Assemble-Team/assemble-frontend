'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';
import { useJoinedGroups } from '@/entities/groups/api/useJoinedGroups';
import { cn } from '@/shared/lib/utils';

/**
 * 알림 개수 요약 로직 (Custom Hook)
 * 비즈니스 로직과 UI를 분리합니다.
 */
function useNotificationSummary() {
  const { data: groups } = useJoinedGroups();
  const totalUnreadCount = groups.reduce((acc, g) => acc + g.unreadChatCount, 0);

  const notificationCount = 2; // 가짜 알림 개수
  return totalUnreadCount + notificationCount;
}

/**
 * 알림 배지 (Sub-component)
 */
function NotificationBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <span className={cn(
      "absolute top-1.5 right-1.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1 text-[8px] font-black text-white shadow-sm"
    )}>
      {count > 99 ? '99+' : count}
    </span>
  );
}

/**
 * NotificationBellContent
 * 순수하게 알림 아이콘과 배지를 렌더링하는 위젯입니다.
 */
function NotificationBellContent() {
  const totalCount = useNotificationSummary();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="알림 확인"
      className="relative"
    >
      <Bell size={22} strokeWidth={2.5} className="text-slate-600" />
      <NotificationBadge count={totalCount} />
    </Button>
  );
}

/**
 * NotificationBell
 * 외부에서 사용할 때 로딩 및 에러 처리가 포함된 진입점입니다.
 */
export function NotificationBell() {
  return (
    <AsyncBoundary
      loadingFallback={
        <Button variant="ghost" size="icon" disabled>
          <Bell size={22} strokeWidth={2.5} className="text-slate-300" />
        </Button>
      }
    >
      <NotificationBellContent />
    </AsyncBoundary>
  );
}
