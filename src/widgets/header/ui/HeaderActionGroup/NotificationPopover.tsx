'use client';

import { useState } from 'react';
import { DropdownMenu } from '@/shared/ui/DropdownMenu';
import { MessageSquare, Bell, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useJoinedGroups } from '@/entities/groups/api/useJoinedGroups';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';

type Tab = 'CHAT' | 'NOTIFICATION';

// 가짜 알림 데이터 (실제 프로젝트에서는 별도 API 연동 권장)
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: '📢 새로운 공지사항',
    content: '주말 테니스 모임의 장소가 변경되었습니다.',
    time: '10분 전',
    isUnread: true,
  },
  {
    id: 2,
    title: '✅ 가입 승인 완료',
    content: 'TypeScript 마스터 클래스 모임 가입이 승인되었습니다.',
    time: '2시간 전',
    isUnread: false,
  },
  {
    id: 3,
    title: '🗓️ 일정 리마인드',
    content: '오늘 저녁 8시에 독서 토론 모임이 예정되어 있습니다.',
    time: '5시간 전',
    isUnread: false,
  },
];

/**
 * NotificationPopover - Compound Component
 * UI와 로직을 분리하여 확장성 있는 알림 팝업을 제공합니다.
 */
export function NotificationPopover({ children }: { children: React.ReactNode }) {
  return <DropdownMenu>{children}</DropdownMenu>;
}

/**
 * 팝업을 트리거하는 버튼 영역
 */
NotificationPopover.Trigger = function NotificationPopoverTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>;
};

/**
 * 알림 및 채팅 목록 컨텐츠 영역
 */
NotificationPopover.Content = function NotificationPopoverContent() {
  const [activeTab, setActiveTab] = useState<Tab>('CHAT');
  const { data: groups } = useJoinedGroups();

  const totalUnreadChat = groups.reduce((acc, g) => acc + g.unreadChatCount, 0);
  const totalUnreadNoti = MOCK_NOTIFICATIONS.filter((n) => n.isUnread).length;

  return (
    <DropdownMenu.Content className="w-[360px] overflow-hidden rounded-[2rem] p-0 shadow-xl border-slate-100">
      {/* 탭 헤더 */}
      <div className="flex border-b border-slate-50 bg-slate-50/50 p-1">
        <TabButton
          active={activeTab === 'CHAT'}
          onClick={() => setActiveTab('CHAT')}
          icon={<MessageSquare size={16} />}
          label="채팅"
          count={totalUnreadChat}
        />
        <TabButton
          active={activeTab === 'NOTIFICATION'}
          onClick={() => setActiveTab('NOTIFICATION')}
          icon={<Bell size={16} />}
          label="알림"
          count={totalUnreadNoti}
        />
      </div>

      {/* 컨텐츠 영역 */}
      <div className="max-h-[480px] overflow-x-hidden overflow-y-auto">
        {activeTab === 'CHAT' ? (
          <div className="divide-y divide-slate-50">
            {groups.length > 0 ? (
              groups.map((group) => (
                <Link
                  key={group.id}
                  href={`${ROUTES.GROUPS.DETAIL(String(group.id))}/chat`}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-slate-50"
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    <img
                      src={group.image}
                      alt={group.title}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="truncate text-sm font-black text-slate-900">
                        {group.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400">
                        오후 2:30
                      </span>
                    </div>
                    <p className="line-clamp-1 text-xs font-medium text-slate-500">
                      {group.unreadChatCount > 0
                        ? '새로운 메시지가 도착했습니다.'
                        : '최근 메시지가 없습니다.'}
                    </p>
                  </div>
                  {group.unreadChatCount > 0 && (
                    <div className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-black text-white">
                      {group.unreadChatCount > 99
                        ? '99+'
                        : group.unreadChatCount}
                    </div>
                  )}
                </Link>
              ))
            ) : (
              <EmptyState message="가입한 모임 채팅이 없습니다." />
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {MOCK_NOTIFICATIONS.length > 0 ? (
              MOCK_NOTIFICATIONS.map((noti) => (
                <div
                  key={noti.id}
                  className={cn(
                    'flex cursor-pointer flex-col gap-1 p-4 transition-colors hover:bg-slate-50',
                    noti.isUnread && 'bg-brand-50/30'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-900">
                      {noti.title}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400">
                      {noti.time}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-600">
                    {noti.content}
                  </p>
                </div>
              ))
            ) : (
              <EmptyState message="새로운 알림이 없습니다." />
            )}
          </div>
        )}
      </div>

      {/* 하단 푸터 */}
      <div className="border-t border-slate-50 p-2 bg-white">
        <Link
          href={
            activeTab === 'CHAT'
              ? ROUTES.GROUPS.MY
              : ROUTES.MYPAGE.SETTINGS.NOTIFICATIONS
          }
          className="flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-black text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          {activeTab === 'CHAT' ? '전체 채팅 목록 보기' : '전체 알림 보기'}
          <ChevronRight size={14} />
        </Link>
      </div>
    </DropdownMenu.Content>
  );
};

// --- 내부 컴포넌트 ---

function TabButton({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-black transition-all',
        active
          ? 'text-brand-600 bg-white shadow-sm'
          : 'text-slate-400 hover:text-slate-600'
      )}
    >
      {icon}
      {label}
      {count > 0 && (
        <span
          className={cn(
            'flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[8px] font-black text-white',
            active ? 'bg-brand-500' : 'bg-slate-300'
          )}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-slate-50 p-3 text-slate-300">
        <Sparkles size={24} />
      </div>
      <p className="text-xs font-bold text-slate-400">{message}</p>
    </div>
  );
}
