'use client';

import {
  Calendar,
  MessageSquare,
  MapPin,
  ChartColumnIncreasing,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import { JoinedGroup } from '../model/types';

interface JoinedGroupCardProps {
  group: JoinedGroup;
}

/**
 * 내가 가입한 모임 전용 그리드 아이템입니다. (보더리스 디자인)
 * 채팅 알림 및 다음 일정 정보를 포함합니다.
 */
export const JoinedGroupCard = ({ group }: JoinedGroupCardProps) => {
  return (
    <div className="group relative flex flex-col gap-3 transition-all duration-300">
      {/* 썸네일 섹션 */}
      <Link
        href={ROUTES.GROUPS.DETAIL(String(group.id))}
        className="relative aspect-video w-full shrink-0 overflow-hidden rounded-3xl"
      >
        <img
          src={group.image}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={group.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-40" />
        
        {/* 카테고리 배지 */}
        <div className="absolute top-3 left-3">
          <span className="rounded-lg bg-white/90 px-2 py-1 text-[9px] font-black tracking-widest text-slate-900 uppercase backdrop-blur-md">
            {group.categoryLabel}
          </span>
        </div>
      </Link>

      {/* 정보 섹션 */}
      <div className="flex flex-col gap-2 px-1">
        <Link href={ROUTES.GROUPS.DETAIL(String(group.id))}>
          <h3 className="group-hover:text-brand-600 line-clamp-1 text-base font-black tracking-tight text-slate-900 transition-colors md:text-lg">
            {group.title}
          </h3>
        </Link>

        {/* 메타 정보 */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <MapPin size={12} />
            <span>{group.location}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <ChartColumnIncreasing size={12} />
            <span>{group.levelLabel}</span>
          </div>
        </div>

        {/* 액션 게이트웨이 (채팅 & 일정) */}
        <div className="mt-2 grid grid-cols-2 gap-2">
          <ActionLink
            href={`${ROUTES.GROUPS.DETAIL(String(group.id))}/chat`}
            icon={
              <MessageSquare
                size={14}
                className={cn(group.unreadChatCount > 0 ? 'text-rose-500' : 'text-slate-400')}
              />
            }
            active={group.unreadChatCount > 0}
          >
            <div className="flex min-w-0 flex-col items-start leading-none">
              <span className={cn('text-[10px] font-black', group.unreadChatCount > 0 ? 'text-rose-600' : 'text-slate-900')}>
                CHAT
              </span>
              <div className="mt-0.5 flex w-full items-center gap-1 overflow-hidden">
                <p className="line-clamp-1 flex-1 text-[9px] font-bold text-slate-400">
                  {group.lastMessage?.content || 'NO MESSAGES'}
                </p>
                {group.unreadChatCount > 0 && (
                  <span className="bg-rose-500 flex h-3 min-w-[12px] items-center justify-center rounded-full px-1 text-[7px] font-black text-white shadow-sm">
                    {group.unreadChatCount > 99 ? '99+' : group.unreadChatCount}
                  </span>
                )}
              </div>
            </div>
          </ActionLink>

          <ActionLink
            href={`${ROUTES.GROUPS.DETAIL(String(group.id))}/schedules`}
            icon={
              <Calendar
                size={14}
                className={cn(group.nextSchedule ? 'text-brand-500' : 'text-slate-400')}
              />
            }
            highlight={!!group.nextSchedule}
          >
            <div className="flex min-w-0 flex-col items-start leading-none">
              <span className={cn('text-[10px] font-black', group.nextSchedule ? 'text-brand-600' : 'text-slate-900')}>
                PLAN
              </span>
              {group.nextSchedule && (
                <span className="mt-0.5 truncate w-full text-[9px] font-bold text-slate-400">
                  {group.nextSchedule.title}
                </span>
              )}
            </div>
          </ActionLink>
        </div>
      </div>
    </div>
  );
};

/**
 * 카드 하단의 작은 링크 버튼 컴포넌트
 */
const ActionLink = ({
  href,
  icon,
  active,
  highlight,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  highlight?: boolean;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className={cn(
      'flex h-10 items-center gap-2 rounded-2xl border px-2.5 transition-all duration-200',
      active
        ? 'border-rose-100 bg-rose-50/30'
        : highlight
          ? 'border-brand-100 bg-brand-50/30'
          : 'border-slate-100 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200'
    )}
  >
    <div className="flex shrink-0 items-center justify-center">{icon}</div>
    <div className="min-w-0 flex-1">{children}</div>
  </Link>
);
